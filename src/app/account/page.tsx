import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Coffee,
  LogOut,
  ReceiptText,
  UserRound,
} from "lucide-react";
import { logoutAction } from "@/features/auth/actions";
import { FavoriteDrinkForm } from "@/features/account/favorite-drink-form";
import { ProfileNameForm } from "@/features/account/profile-name-form";
import { Reveal } from "@/components/motion/reveal";
import {
  OrderCard,
  type AccountOrder,
} from "@/features/account/order-card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Account",
};

type FavoriteProduct = {
  id: string;
  name: string;
  slug: string;
};

type ProfileRow = {
  full_name: string | null;
  phone: string | null;
  role: string;
  favorite_product_id: string | null;
  favorite_product:
    | FavoriteProduct
    | FavoriteProduct[]
    | null;
};

type ProductOption = {
  id: string;
  name: string;
  artwork: string;
};

function getFavoriteProduct(
  value: ProfileRow["favorite_product"],
): FavoriteProduct | null {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] ?? null;
  }

  return value;
}

export default async function AccountPage() {
  const supabase = await createClient();

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    redirect("/auth/login");
  }

  const [
    profileResult,
    productsResult,
    recentOrderResult,
    orderCountResult,
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select(
        `
          full_name,
          phone,
          role,
          favorite_product_id,
          favorite_product:products!profiles_favorite_product_id_fkey (
            id,
            name,
            slug
          )
        `,
      )
      .eq("id", user.id)
      .maybeSingle(),

    supabase
      .from("products")
      .select("id, name, artwork")
      .eq("is_available", true)
      .order("name"),

    supabase
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
      })
      .limit(1)
      .maybeSingle(),

    supabase
      .from("orders")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("customer_id", user.id),
  ]);

  if (profileResult.error) {
    console.error(
      "Could not load profile:",
      profileResult.error,
    );
  }

  if (productsResult.error) {
    console.error(
      "Could not load favorite options:",
      productsResult.error,
    );
  }

  if (recentOrderResult.error) {
    console.error(
      "Could not load recent order:",
      recentOrderResult.error,
    );
  }

  const profile =
    (profileResult.data as ProfileRow | null) ?? null;

  const products =
    (productsResult.data as ProductOption[] | null) ?? [];

  const recentOrder =
    (recentOrderResult.data as AccountOrder | null) ?? null;

  const orderCount = orderCountResult.count ?? 0;
  const favoriteProduct = getFavoriteProduct(
    profile?.favorite_product ?? null,
  );

  const metadataName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : null;

  const displayName =
    profile?.full_name || metadataName || "Coffee friend";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <main className="page-main account-dashboard-page">
      <section className="account-dashboard-hero">
        <Reveal className="page-shell account-dashboard-heading">
          <div>
            <p className="eyebrow">
              Your TSIKAVA account
            </p>

            <h1>Welcome, {displayName}.</h1>

            <p>
              Manage your favorite drink and view orders
              attached to your account.
            </p>
          </div>

          <div className="account-profile-badge">
            <span>{initials}</span>

            <div>
              <strong>{displayName}</strong>
              <p>{user.email}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="page-shell account-dashboard-grid">
        <Reveal className="account-dashboard-main">
          <div className="account-section-heading">
            <div>
              <p className="section-number">
                01 · Recent order
              </p>

              <h2>
                {recentOrder
                  ? "Your latest order"
                  : "No recent account orders"}
              </h2>
            </div>

            {orderCount > 0 ? (
              <Link
                className="section-link"
                href="/account/orders"
              >
                View all {orderCount}
                <ArrowRight size={16} />
              </Link>
            ) : null}
          </div>

          {recentOrder ? (
            <OrderCard order={recentOrder} />
          ) : (
            <div className="account-empty-panel">
              <ReceiptText size={30} />

              <div>
                <h3>No orders are attached yet.</h3>

                <p>
                  Log in before placing an order so the
                  checkout function saves your user ID.
                </p>
              </div>

              <Link className="primary-button" href="/menu">
                Order a drink
              </Link>
            </div>
          )}

          <div className="account-section-heading favorite-heading">
            <div>
              <p className="section-number">
                02 · Favorite drink
              </p>

              <h2>
                {favoriteProduct
                  ? favoriteProduct.name
                  : "Choose your favorite"}
              </h2>
            </div>

            {favoriteProduct ? (
              <Link
                className="section-link"
                href={`/menu/${favoriteProduct.slug}`}
              >
                View drink
                <ArrowRight size={16} />
              </Link>
            ) : null}
          </div>

          <FavoriteDrinkForm
            currentFavoriteId={
              profile?.favorite_product_id ?? null
            }
            products={products}
          />
        </Reveal>

        <Reveal className="account-dashboard-sidebar" delay={1}>
          <div className="account-summary-card">
            <div className="preview-header">
              <p>Your profile</p>
              <span>{initials}</span>
            </div>

            <div className="preview-stat">
              <UserRound size={21} />

              <div>
                <strong>Account details</strong>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="preview-stat">
              <Coffee size={21} />

              <div>
                <strong>Favorite drink</strong>
                <p>
                  {favoriteProduct?.name ??
                    "Not selected yet"}
                </p>
              </div>
            </div>

            <div className="preview-stat">
              <ReceiptText size={21} />

              <div>
                <strong>Account orders</strong>
                <p>
                  {orderCount === 1
                    ? "1 order"
                    : `${orderCount} orders`}
                </p>
              </div>
            </div>

            <div className="preview-decoration">
              ЦІКАВА · КАВА · ГАРБАТА
            </div>

            <ProfileNameForm currentName={displayName} />
          </div>

          <form action={logoutAction}>
            <button
              className="secondary-button account-logout-button"
              type="submit"
            >
              <LogOut size={18} />
              Log out
            </button>
          </form>
        </Reveal>
      </section>
    </main>
  );
}
