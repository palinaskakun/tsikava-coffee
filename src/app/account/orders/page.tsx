import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, ReceiptText } from "lucide-react";
import {
  OrderCard,
  type AccountOrder,
} from "@/features/account/order-card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Order history",
};

export default async function OrdersPage() {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      `
        id,
        status,
        payment_status,
        total,
        pickup_time,
        created_at,
        order_items (
          id,
          product_name,
          quantity,
          line_total
        )
      `,
    )
    .eq("customer_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Could not load orders:", error);
  }

  const orders = (data ?? []) as AccountOrder[];

  return (
    <main className="page-main account-orders-page">
      <section className="page-shell account-orders-heading">
        <Link className="back-link" href="/account">
          <ArrowLeft size={17} />
          Back to account
        </Link>

        <p className="eyebrow">
          <ReceiptText size={16} />
          Your history
        </p>

        <h1>Your TSIKAVA orders.</h1>

        <p>
          Orders placed while you are logged in will appear
          here.
        </p>
      </section>

      <section className="page-shell account-orders-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="account-orders-empty">
            <ReceiptText size={34} />

            <h2>No account orders yet.</h2>

            <p>
              An order must be placed while you are logged in
              for it to be attached to this account.
            </p>

            <Link className="primary-button" href="/menu">
              Browse the menu
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}