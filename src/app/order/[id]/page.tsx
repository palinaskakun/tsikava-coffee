import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PaymentSuccessHandler } from "@/features/checkout/payment-success-handler";
import {
  ArrowRight,
  Check,
  Clock3,
  Coffee,
  ReceiptText,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Order received",
};

type OrderConfirmationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type OrderRow = {
  id: string;
  customer_name: string;
  status: string;
  payment_status: string;
  subtotal: number | string;
  tax: number | string;
  total: number | string;
  pickup_time: string | null;
  created_at: string;
  order_items:
    | {
        id: string;
        product_name: string;
        quantity: number;
        unit_price: number | string;
        line_total: number | string;
      }[]
    | null;
};

function shortenOrderId(id: string) {
  return id.split("-")[0]?.toUpperCase() ?? id;
}

function formatPrice(value: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatStatus(value: string) {
  return value
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
}

export default async function OrderConfirmationPage({
  params,
}: OrderConfirmationPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
        id,
        customer_name,
        status,
        payment_status,
        subtotal,
        tax,
        total,
        pickup_time,
        created_at,
        order_items (
          id,
          product_name,
          quantity,
          unit_price,
          line_total
        )
      `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Could not load order:", error);
  }

  const order = (data as OrderRow | null) ?? null;

  if (!order) {
    notFound();
  }

  const items = order.order_items ?? [];

  return (
    <main className="order-confirmation-page">
      <section className="page-shell order-confirmation-card">
        <PaymentSuccessHandler
        paymentStatus={order.payment_status}
      />
        <div className="order-success-icon">
          <Check size={38} />
        </div>

        <p className="eyebrow">
          Order received
        </p>

        <h1>
          Something interesting is being prepared.
        </h1>

        <p className="order-confirmation-intro">
        {order.payment_status === "paid"
          ? `Thank you, ${order.customer_name}. Your Stripe test payment was completed successfully.`
          : "Stripe returned to TSIKAVA, but the payment webhook is still being processed. Refresh this page in a moment."}
      </p>

        <div className="order-confirmation-details">
          <div>
            <ReceiptText size={21} />

            <span>
              <small>Order number</small>
              <strong>
                #{shortenOrderId(order.id)}
              </strong>
            </span>
          </div>

          <div>
            <Clock3 size={21} />

            <span>
              <small>Pickup</small>
              <strong>
                {order.pickup_time
                  ? formatTime(order.pickup_time)
                  : "Not selected"}
              </strong>
            </span>
          </div>

          <div>
            <Coffee size={21} />

            <span>
              <small>Status</small>
              <strong>
                {formatStatus(order.status)}
              </strong>
            </span>
          </div>
        </div>

        <div className="order-receipt">
          <div className="order-receipt-heading">
            <h2>Order details</h2>

            <span>
              {formatStatus(order.payment_status)}
            </span>
          </div>

          <div className="order-receipt-items">
            {items.map((item) => (
              <div key={item.id}>
                <span>
                  {item.quantity} × {item.product_name}
                </span>

                <strong>
                  {formatPrice(item.line_total)}
                </strong>
              </div>
            ))}
          </div>

          <div className="order-receipt-calculation">
            <div>
              <span>Subtotal</span>
              <strong>
                {formatPrice(order.subtotal)}
              </strong>
            </div>

            <div>
              <span>Tax</span>
              <strong>{formatPrice(order.tax)}</strong>
            </div>

            <div className="order-receipt-total">
              <span>Total</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>
          </div>
        </div>

        <div className="order-confirmation-actions">
          <Link className="primary-button" href="/menu">
            Return to menu
            <ArrowRight size={18} />
          </Link>

          <Link
            className="secondary-button"
            href="/account/orders"
          >
            View order history
          </Link>
        </div>
      </section>
    </main>
  );
}