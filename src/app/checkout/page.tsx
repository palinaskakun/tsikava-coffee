import type { Metadata } from "next";
import { CheckoutForm } from "@/features/checkout/checkout-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete a test pickup order from TSIKAVA.",
};

type ProfileRow = {
  full_name: string | null;
};

export default async function CheckoutPage() {
  const supabase = await createClient();

  const { data: userData } =
    await supabase.auth.getUser();

  const user = userData.user;

  let profile: ProfileRow | null = null;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle<ProfileRow>();

    profile = data;
  }

  const defaultName =
    profile?.full_name ??
    (typeof user?.user_metadata?.full_name ===
    "string"
      ? user.user_metadata.full_name
      : "");

  const defaultEmail = user?.email ?? "";

  return (
    <CheckoutForm
      defaultEmail={defaultEmail}
      defaultName={defaultName}
      isAuthenticated={Boolean(user)}
    />
  );
}