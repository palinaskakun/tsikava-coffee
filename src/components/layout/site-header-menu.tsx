"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { HeaderCartLink } from "@/components/cart/header-cart-link";

const navigation = [
  { label: "Menu", href: "/menu" },
  { label: "Locations", href: "/locations" },
  { label: "Our story", href: "/about" },
];

type SiteHeaderMenuProps = {
  isAuthenticated: boolean;
};

export function SiteHeaderMenu({
  isAuthenticated,
}: SiteHeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const accountHref = isAuthenticated ? "/account" : "/auth/login";
  const accountLabel = isAuthenticated ? "Account" : "Log in";

  return (
    <header className="site-header">
      <nav aria-label="Main navigation" className="site-nav page-shell">
        <div className="nav-start">
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="menu-trigger"
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            {isOpen ? <X size={19} /> : <Menu size={21} />}
          </button>

          <div className="nav-links desktop-navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Link aria-label="TSIKAVA homepage" className="wordmark" href="/">
          TSIKAVA<span>!</span>
        </Link>

        <div className="nav-end">
          <Link className="header-account-link" href={accountHref}>
            {accountLabel}
          </Link>
          <HeaderCartLink />
        </div>
      </nav>

      <div
        className={isOpen ? "mobile-menu is-open" : "mobile-menu"}
        id="mobile-navigation"
      >
        <div className="page-shell mobile-menu-inner">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href={accountHref} onClick={() => setIsOpen(false)}>
            {isAuthenticated ? "Your account" : "Log in or sign up"}
          </Link>
        </div>
      </div>
    </header>
  );
}
