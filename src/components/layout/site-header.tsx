import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const navigation = [
  { label: "Menu", href: "/menu" },
  { label: "Our story", href: "/about" },
  { label: "Account", href: "/account" },
];

export function SiteHeader() {
  return (
    <>
      <div className="pattern-strip" aria-hidden="true" />

      <header className="site-header">
        <nav className="site-nav page-shell" aria-label="Main navigation">
          <Link className="wordmark" href="/" aria-label="TSIKAVA homepage">
            TSIKAVA<span>!</span>
          </Link>

          <div className="nav-links">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <Link className="cart-button" href="/cart">
            <ShoppingBag size={18} strokeWidth={2.2} />
            <span className="cart-label">Cart</span>
            <span className="cart-count">0</span>
          </Link>
        </nav>
      </header>
    </>
  );
}