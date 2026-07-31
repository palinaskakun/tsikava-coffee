import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-heading">
          <p className="eyebrow">Join TSIKAVA</p>
          <h1>Create your account.</h1>
          <p>
            Save your information, view order history, and return to favorite
            drinks.
          </p>
        </div>

        <form className="auth-form">
          <label>
            Full name
            <input
              autoComplete="name"
              name="fullName"
              placeholder="Your name"
              type="text"
            />
          </label>

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
              autoComplete="new-password"
              name="password"
              placeholder="At least 8 characters"
              type="password"
            />
          </label>

          <button className="primary-button form-button" type="button">
            Create account
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-switch">
          Already registered? <Link href="/auth/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}