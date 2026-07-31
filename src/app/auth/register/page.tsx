import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/features/auth/register-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Register",
};

export default async function RegisterPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    redirect("/account");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-heading">
          <p className="eyebrow">Join TSIKAVA</p>
          <h1>Create your account.</h1>

          <p>
            Save your information, view order history, and
            return to your favorite drinks.
          </p>
        </div>

        <RegisterForm />

        <p className="auth-switch">
          Already registered?{" "}
          <Link href="/auth/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}