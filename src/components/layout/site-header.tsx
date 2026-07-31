import Link from "next/link";
import { HeaderCartLink } from "@/components/cart/header-cart-link";

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

export function SiteHeader() {
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

            <Link href="/auth/login">
              Log in
            </Link>
          </div>

          <HeaderCartLink />
        </nav>
      </header>
    </div>
  );
}