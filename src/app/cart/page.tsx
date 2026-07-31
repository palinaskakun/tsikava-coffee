import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <main className="page-main">
      <section className="simple-page-section page-shell">
        <div className="empty-state">
          <div className="empty-state-icon">
            <ShoppingBag size={34} />
          </div>

          <p className="eyebrow">Your order</p>
          <h1>Your cart is taking a coffee break.</h1>

          <p>
            Choose a drink from the menu and it will appear here. The working
            cart is our next development step.
          </p>

          <Link className="primary-button" href="/menu">
            <ArrowLeft size={18} />
            Browse the menu
          </Link>
        </div>
      </section>
    </main>
  );
}