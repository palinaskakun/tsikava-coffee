import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-heading">
          <p className="eyebrow">Welcome back</p>
          <h1>Log in to TSIKAVA.</h1>
          <p>
            Authentication will be connected to Supabase in the next stage.
          </p>
        </div>

        <form className="auth-form">
          <label>
            Email address
            <input
              autoComplete="email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
          </label>

          <label>
            Password
            <input
              autoComplete="current-password"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
          </label>

          <button className="primary-button form-button" type="button">
            Log in
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link href="/auth/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}