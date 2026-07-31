import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/features/auth/login-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Log in",
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    redirect("/account");
  }

  const parameters = await searchParams;

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-heading">
          <p className="eyebrow">Welcome back</p>
          <h1>Log in to TSIKAVA.</h1>

          <p>
            View your saved details, recent orders, and
            favorite drinks.
          </p>
        </div>

        {parameters.error ? (
          <div
            className="mt-7 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            role="alert"
          >
            {parameters.error}
          </div>
        ) : null}

        <LoginForm />

        <p className="auth-switch">
          New here?{" "}
          <Link href="/auth/register">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}