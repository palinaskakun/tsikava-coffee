"use server";

import { z } from "zod";
import type { CheckoutState } from "@/features/checkout/checkout-state";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

const cartItemSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(150),
  quantity: z
    .number()
    .int()
    .min(1)
    .max(20),
  selectedOptions: z
    .array(z.string().uuid())
    .max(20),
});

const checkoutSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(100),
  customerEmail: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(200),
  pickupMinutes: z
    .number()
    .int()
    .refine(
      (value) =>
        [15, 30, 45, 60].includes(value),
      "Choose a valid pickup time.",
    ),
  customerNotes: z
    .string()
    .trim()
    .max(
      500,
      "Order notes cannot exceed 500 characters.",
    ),
  cart: z
    .array(cartItemSchema)
    .min(1, "Your cart is empty.")
    .max(50),
});

type OrderItemRow = {
  id: string;
  product_name: string;
  unit_price: number | string;
  quantity: number;
  selected_options: {
    name?: string;
    groupName?: string;
  }[];
};

type OrderRow = {
  id: string;
  customer_email: string | null;
  tax: number | string;
  order_items: OrderItemRow[] | null;
};

export async function placeOrderAction(
  _previousState: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  let parsedCart: unknown;

  try {
    parsedCart = JSON.parse(
      String(formData.get("cart") ?? "[]"),
    );
  } catch {
    return {
      status: "error",
      message:
        "The cart could not be read. Return to the menu and try again.",
    };
  }

  const result = checkoutSchema.safeParse({
    customerName: formData.get("customerName"),
    customerEmail: formData.get("customerEmail"),
    pickupMinutes: Number(
      formData.get("pickupMinutes"),
    ),
    customerNotes:
      formData.get("customerNotes") ?? "",
    cart: parsedCart,
  });

  if (!result.success) {
    const flattened =
      result.error.flatten();

    return {
      status: "error",
      message:
        "Check the checkout information and try again.",
      fieldErrors: {
        customerName:
          flattened.fieldErrors.customerName,
        customerEmail:
          flattened.fieldErrors.customerEmail,
        pickupMinutes:
          flattened.fieldErrors.pickupMinutes,
        customerNotes:
          flattened.fieldErrors.customerNotes,
        cart: flattened.fieldErrors.cart,
      },
    };
  }

  const supabase = await createClient();

  const { data: userData } =
    await supabase.auth.getUser();

  if (!userData.user) {
    return {
      status: "error",
      message:
        "Log in before completing payment.",
    };
  }

  const pickupTime = new Date(
    Date.now() +
      result.data.pickupMinutes *
        60 *
        1000,
  ).toISOString();

  const { data: orderId, error: orderError } =
    await supabase.rpc("create_order", {
      p_customer_name:
        result.data.customerName,
      p_customer_email:
        result.data.customerEmail,
      p_pickup_time: pickupTime,
      p_customer_notes:
        result.data.customerNotes || null,
      p_items: result.data.cart,
    });

  if (
    orderError ||
    typeof orderId !== "string"
  ) {
    console.error(
      "Could not create pending order:",
      orderError,
    );

    return {
      status: "error",
      message:
        orderError?.message ??
        "The pending order could not be created.",
    };
  }

  const { data: orderData, error: fetchError } =
    await supabase
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
    console.error(
      "Could not retrieve order:",
      fetchError,
    );

    return {
      status: "error",
      message:
        "The order was created, but payment could not be started.",
    };
  }

  const order = orderData as OrderRow;
  const orderItems =
    order.order_items ?? [];

  const lineItems = orderItems.map(
    (item) => {
      const selectedOptions =
        Array.isArray(item.selected_options)
          ? item.selected_options
              .map((option) => option.name)
              .filter(Boolean)
              .join(", ")
          : "";

      return {
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(
            Number(item.unit_price) * 100,
          ),
          product_data: {
            name: item.product_name,
            description:
              selectedOptions || undefined,
          },
        },
      };
    },
  );

  /*
   * Include tax as a separate Stripe line item so
   * Stripe's total equals the Supabase order total.
   */
  const taxInCents = Math.round(
    Number(order.tax) * 100,
  );

  if (taxInCents > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: taxInCents,
        product_data: {
          name: "Estimated tax",
          description: undefined,
        },
      },
    });
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  try {
    const session =
      await stripe.checkout.sessions.create(
        {
          mode: "payment",
          customer_email:
            order.customer_email ??
            result.data.customerEmail,
          line_items: lineItems,
          success_url:
            `${siteUrl}/order/${order.id}` +
            "?payment=success",
          cancel_url:
            `${siteUrl}/checkout` +
            "?payment=cancelled",
          metadata: {
            order_id: order.id,
            user_id: userData.user.id,
          },
          payment_intent_data: {
            metadata: {
              order_id: order.id,
            },
          },
        },
        {
          idempotencyKey:
            `tsikava-order-${order.id}`,
        },
      );

    if (!session.url) {
      return {
        status: "error",
        message:
          "Stripe did not return a checkout page.",
      };
    }

    /*
     * This update is allowed only if you add the
     * owner update policy shown below.
     */
    const { error: sessionUpdateError } =
      await supabase
        .from("orders")
        .update({
          stripe_checkout_session_id:
            session.id,
        })
        .eq("id", order.id)
        .eq(
          "customer_id",
          userData.user.id,
        );

    if (sessionUpdateError) {
      console.error(
        "Could not save Stripe session:",
        sessionUpdateError,
      );
    }

    return {
      status: "success",
      message:
        "Redirecting to secure test payment...",
      checkoutUrl: session.url,
    };
  } catch (error) {
    console.error(
      "Stripe Checkout error:",
      error,
    );

    return {
      status: "error",
      message:
        "Stripe Checkout could not be started.",
    };
  }
}