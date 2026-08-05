"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const labels: Record<string, string> = {
  about: "Our story",
  account: "Account",
  auth: "Account",
  cart: "Cart",
  checkout: "Checkout",
  locations: "Locations",
  login: "Log in",
  menu: "Menu",
  order: "Order",
  orders: "Orders",
  privacy: "Privacy",
  register: "Sign up",
  social: "Social media",
  terms: "Terms",
};

function labelFor(segment: string) {
  return labels[segment] ?? segment.replace(/-/g, " ");
}

export function RouteBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="route-breadcrumb page-shell">
      <Link href="/">Home</Link>
      {segments.map((segment, index) => {
        const isCurrent = index === segments.length - 1;
        const href = `/${segments.slice(0, index + 1).join("/")}`;

        return (
          <span className="route-breadcrumb-part" key={`${href}-${segment}`}>
            <span aria-hidden="true">&gt;</span>
            {isCurrent ? (
              <span aria-current="page">{labelFor(segment)}</span>
            ) : (
              <Link href={href}>{labelFor(segment)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
