import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY is not configured." },
        { status: 500 }
      );
    }

    if (!supabaseUrl || !supabasePublishableKey) {
      return NextResponse.json(
        { error: "Supabase environment variables are not configured." },
        { status: 500 }
      );
    }

    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "You must be signed in before checking out." },
        { status: 401 }
      );
    }

    const accessToken = authorization.replace("Bearer ", "").trim();

    const supabase = createClient(
      supabaseUrl,
      supabasePublishableKey,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );

    const {
      data: userData,
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "Your login session is invalid or expired." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Debug: log incoming payload to help diagnose missing option errors
    console.debug("[mobile/payment-sheet] incoming body:", JSON.stringify(body));

    const {
      customerName,
      customerEmail,
      pickupMinutes,
      customerNotes,
      cart,
    } = body;

    if (
      typeof customerName !== "string" ||
      typeof customerEmail !== "string" ||
      typeof pickupMinutes !== "number" ||
      !Array.isArray(cart) ||
      cart.length === 0
    ) {
      return NextResponse.json(
        { error: "The checkout request is missing required information." },
        { status: 400 }
      );
    }

    // Basic validation for cart items sent by mobile clients.
    const invalidItem = Array.isArray(cart)
      ? cart.find((it: any) => {
          if (!it || typeof it !== "object") return true;
          if (typeof it.slug !== "string" && typeof it.productId !== "string") return true;
          if (typeof it.quantity !== "number" || it.quantity < 1) return true;
          if (it.selectedOptions && !Array.isArray(it.selectedOptions)) return true;
          return false;
        })
      : undefined;

    if (invalidItem) {
      return NextResponse.json(
        { error: "Cart is malformed. Ensure each item has a slug/productId and quantity." },
        { status: 400 },
      );
    }

    console.info("Mobile checkout request", {
      userId: userData.user.id,
      itemsCount: cart.length,
      pickupMinutes,
    });

    // Create a pending order on the server so prices/tax are authoritative.
    const pickupTime = new Date(
      Date.now() + pickupMinutes * 60 * 1000,
    ).toISOString();

    const { data: orderId, error: orderError } =
      await supabase.rpc("create_order", {
        p_customer_name: customerName,
        p_customer_email: customerEmail,
        p_pickup_time: pickupTime,
        p_customer_notes: customerNotes || null,
        p_items: cart,
      });

    if (orderError || typeof orderId !== "string") {
      console.error("Could not create pending order:", orderError);

      return NextResponse.json(
        { error: orderError?.message ?? "Could not create order." },
        { status: 500 },
      );
    }

    // Retrieve the created order (with computed unit prices and tax)
    const { data: orderData, error: fetchError } = await supabase
      .from("orders")
      .select(
        `
          id,
          customer_email,
          tax,
          order_items (
            id,
            product_name,
            unit_price,
            quantity,
            selected_options
          )
        `,
      )
      .eq("id", orderId)
      .single();

    if (fetchError || !orderData) {
      console.error("Could not retrieve order:", fetchError);

      return NextResponse.json(
        { error: "The order was created, but could not be retrieved." },
        { status: 500 },
      );
    }

    const order = orderData as {
      id: string;
      customer_email: string | null;
      tax: number | string;
      order_items: Array<{
        unit_price: number | string;
        quantity: number;
      }> | null;
    };

    const items = order.order_items ?? [];

    // Sum item totals from server-side unit_price * quantity
    const itemsTotalInCents = items.reduce((sum, it) => {
      const unit = Math.round(Number(it.unit_price) * 100);
      const qty = Number(it.quantity) || 0;
      return sum + unit * qty;
    }, 0);

    const taxInCents = Math.round(Number(order.tax || 0) * 100);

    const amountInCents = itemsTotalInCents + taxInCents;

    console.info("Computed authoritative amount (cents):", {
      orderId: order.id,
      itemsTotalInCents,
      taxInCents,
      amountInCents,
    });

    const stripe = new Stripe(stripeSecretKey);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      receipt_email: customerEmail,
      metadata: {
        userId: userData.user.id,
        orderId: order.id,
        customerName,
        pickupMinutes: String(pickupMinutes),
        customerNotes: typeof customerNotes === "string" ? customerNotes : "",
      },
    });

    if (!paymentIntent.client_secret) {
      return NextResponse.json(
        { error: "Stripe did not return a payment client secret." },
        { status: 500 }
      );
    }

    // Return authoritative identifiers and amount so clients can confirm totals.
    return NextResponse.json({
      paymentIntentClientSecret: paymentIntent.client_secret,
      orderId: order.id,
      amountInCents,
    });
  } catch (error) {
    console.error("Mobile payment route error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Checkout could not be started.",
      },
      { status: 500 }
    );
  }
}