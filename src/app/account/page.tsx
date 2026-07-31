import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Coffee, LogIn, ReceiptText } from "lucide-react";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <main className="page-main">
      <section className="account-hero">
        <div className="page-shell account-layout">
          <div className="account-copy">
            <p className="eyebrow">Your TSIKAVA account</p>

            <h1>Favorites, orders, and coffee plans in one place.</h1>

            <p>
              Registration will let customers view previous orders, save basic
              details, and eventually reorder favorite drinks.
            </p>

            <div className="account-actions">
              <Link className="primary-button" href="/auth/register">
                Create an account
                <ArrowRight size={18} />
              </Link>

              <Link className="secondary-button" href="/auth/login">
                <LogIn size={18} />
                Log in
              </Link>
            </div>
          </div>

          <div className="account-preview">
            <div className="preview-header">
              <p>Good morning</p>
              <span>PS</span>
            </div>

            <div className="preview-stat">
              <Coffee size={21} />
              <div>
                <strong>Favorite drink</strong>
                <p>Cherry Kava</p>
              </div>
            </div>

            <div className="preview-stat">
              <ReceiptText size={21} />
              <div>
                <strong>Recent order</strong>
                <p>No orders yet</p>
              </div>
            </div>

            <div className="preview-decoration">
              ЦІКАВА · КАВА · ГАРБАТА
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}