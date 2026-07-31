import Link from "next/link";
import { HeaderCartLink } from "@/components/cart/header-cart-link";
import { createClient } from "@/lib/supabase/server";

const navigation = [
  {
    label: "Menu",
    href: "/menu",
  },
  {
    label: "Our story",
    href: "/about",
  },
];

export async function SiteHeader() {
  let isAuthenticated = false;

  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getClaims();

    isAuthenticated = Boolean(data?.claims);
  } catch (error) {
    console.error("Could not load header auth state:", error);
  }

  return (
    <div className="site-header-stack">
      <div
        aria-hidden="true"
        className="pattern-strip"
      />

      <header className="site-header">
        <nav
          aria-label="Main navigation"
          className="site-nav page-shell"
        >
          <Link
            aria-label="TSIKAVA homepage"
            className="wordmark"
            href="/"
          >
            TSIKAVA<span>!</span>
          </Link>

          <div className="nav-links">
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href={
                isAuthenticated
                  ? "/account"
                  : "/auth/login"
              }
            >
              {isAuthenticated
                ? "Account"
                : "Log in"}
            </Link>
          </div>

          <HeaderCartLink />
        </nav>
      </header>
    </div>
  );
}