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

async function getIsAuthenticated() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error(
        "Unable to read the current user in the header:",
        error.message,
      );

      return false;
    }

    return Boolean(user);
  } catch (error) {
    console.error(
      "Unable to initialize authentication in the header:",
      error,
    );

    return false;
  }
}

export async function SiteHeader() {
  const isAuthenticated =
    await getIsAuthenticated();

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
            TSIKAVA
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