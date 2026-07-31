import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(
  request: Request,
) {
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error(
      "Missing STRIPE_WEBHOOK_SECRET.",
    );

    return NextResponse.json(
      {
        error:
          "Webhook is not configured.",
      },
      {
        status: 500,
      },
    );
  }

  const signature = request.headers.get(
    "stripe-signature",
  );

  if (!signature) {
    return NextResponse.json(
      {
        error:
          "Missing Stripe signature.",
      },
      {
        status: 400,
      },
    );
  }

  const rawBody = await request.text();

  let event: Stripe.Event;

  try {
    event =
      stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
  } catch (error) {
    console.error(
      "Invalid Stripe signature:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Invalid webhook signature.",
      },
      {
        status: 400,
      },
    );
  }

  if (
    event.type ===
    "checkout.session.completed"
  ) {
    const session =
      event.data
        .object as Stripe.Checkout.Session;

    const orderId =
      session.metadata?.order_id;

    if (!orderId) {
      console.error(
        "Stripe session is missing order_id metadata.",
      );

      return NextResponse.json(
        {
          error:
            "Missing order metadata.",
        },
        {
          status: 400,
        },
      );
    }

    const paymentIntentId =
      typeof session.payment_intent ===
      "string"
        ? session.payment_intent
        : session.payment_intent?.id ??
          null;

    const { error } =
      await supabaseAdmin
        .from("orders")
        .update({
          payment_status: "paid",
          stripe_checkout_session_id:
            session.id,
          stripe_payment_intent_id:
            paymentIntentId,
        })
        .eq("id", orderId)
        .neq(
          "payment_status",
          "paid",
        );

    if (error) {
      console.error(
        "Could not mark order paid:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "Database update failed.",
        },
        {
          status: 500,
        },
      );
    }
  }

  if (
    event.type ===
    "checkout.session.expired"
  ) {
    const session =
      event.data
        .object as Stripe.Checkout.Session;

    const orderId =
      session.metadata?.order_id;

    if (orderId) {
      await supabaseAdmin
        .from("orders")
        .update({
          payment_status: "failed",
          status: "cancelled",
        })
        .eq("id", orderId)
        .eq(
          "payment_status",
          "pending",
        );
    }
  }

  return NextResponse.json({
    received: true,
  });
}