"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { DrinkIllustration } from "@/components/menu/drink-illustration";
import { useCartStore } from "@/stores/cart-store";

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function CartView() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
  } = useCartStore();

  const [hydrated, setHydrated] =
    useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + item.unitPrice * item.quantity,
      0,
    );
  }, [items]);

  const estimatedTax = subtotal * 0.06;
  const total = subtotal + estimatedTax;

  if (!hydrated) {
    return (
      <main className="page-main">
        <section className="simple-page-section page-shell">
          <p className="text-sm text-neutral-600">
            Loading your cart...
          </p>
        </section>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="page-main">
        <section className="simple-page-section page-shell">
          <div className="empty-state">
            <div className="empty-state-icon">
              <ShoppingBag size={34} />
            </div>

            <p className="eyebrow">
              Your order
            </p>

            <h1>
              Your cart is taking a coffee
              break.
            </h1>

            <p>
              Choose a drink from the menu and
              it will appear here.
            </p>

            <Link
              className="primary-button"
              href="/menu"
            >
              <ArrowLeft size={18} />
              Browse the menu
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-main">
      <section className="page-shell py-16 md:py-24">
        <div className="mb-10 flex flex-col gap-5 border-b border-black/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">
              Your order
            </p>

            <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-5xl font-semibold leading-[0.95] tracking-[-0.055em] md:text-7xl">
              A few interesting choices.
            </h1>
          </div>

          <button
            className="inline-flex w-fit items-center gap-2 rounded-full border border-black/15 px-4 py-2 text-sm font-bold transition hover:border-red-800 hover:text-red-800"
            onClick={clearCart}
            type="button"
          >
            <Trash2 size={16} />
            Clear cart
          </button>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <article
                className="grid gap-5 rounded-[30px] border border-black/10 bg-white/70 p-5 shadow-sm sm:grid-cols-[150px_1fr] sm:items-center"
                key={item.cartItemId}
              >
                <DrinkIllustration
                  artwork={item.artwork}
                  compact
                />

                <div>
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.15em] text-red-800">
                        TSIKAVA drink
                      </p>

                      <Link
                        className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.04em]"
                        href={`/menu/${item.slug}`}
                      >
                        {item.name}
                      </Link>

                      {item.selectedOptions.length > 0 ? (
                        <p className="cart-item-options">
                          {item.selectedOptions
                            .map((option) => option.name)
                            .join(" · ")}
                        </p>
                      ) : null}

                      <p className="mt-2 text-sm text-neutral-600">
                        {formatPrice(
                          item.unitPrice,
                        )}{" "}
                        each
                      </p>
                    </div>

                    <button
                      aria-label={`Remove ${item.name}`}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/10 transition hover:border-red-800 hover:bg-red-50 hover:text-red-800"
                      onClick={() =>
                        removeItem(
                          item.cartItemId,
                        )
                      }
                      type="button"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-5">
                    <div className="inline-flex items-center rounded-full border border-black/15 bg-white p-1">
                      <button
                        aria-label={`Decrease ${item.name} quantity`}
                        className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-neutral-100"
                        onClick={() =>
                          decreaseQuantity(
                            item.cartItemId,
                          )
                        }
                        type="button"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="min-w-10 text-center text-sm font-extrabold">
                        {item.quantity}
                      </span>

                      <button
                        aria-label={`Increase ${item.name} quantity`}
                        className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-neutral-100"
                        onClick={() =>
                          increaseQuantity(
                            item.cartItemId,
                          )
                        }
                        type="button"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <strong className="text-lg">
                      {formatPrice(
                        item.unitPrice *
                          item.quantity,
                      )}
                    </strong>
                  </div>
                </div>
              </article>
            ))}

            <Link
              className="mt-3 inline-flex w-fit items-center gap-2 text-sm font-extrabold"
              href="/menu"
            >
              <ArrowLeft size={17} />
              Continue browsing
            </Link>
          </div>

          <aside className="h-fit rounded-[34px] border border-black/10 bg-[#fffdf9] p-7 shadow-[0_25px_70px_rgba(52,32,29,0.1)] lg:sticky lg:top-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-red-800">
              Order summary
            </p>

            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.05em]">
              Almost ready.
            </h2>

            <div className="mt-8 flex flex-col gap-4 border-y border-black/10 py-6 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">
                  Subtotal
                </span>
                <strong>
                  {formatPrice(subtotal)}
                </strong>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-neutral-600">
                  Estimated tax
                </span>
                <strong>
                  {formatPrice(
                    estimatedTax,
                  )}
                </strong>
              </div>
            </div>

            <div className="flex items-end justify-between gap-4 py-6">
              <span className="font-bold">
                Total
              </span>

              <strong className="font-[family-name:var(--font-display)] text-3xl">
                {formatPrice(total)}
              </strong>
            </div>

            <Link
              className="primary-button w-full"
              href="/checkout"
            >
              Continue to checkout
              <ArrowRight size={18} />
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-neutral-500">
              This total is currently an estimate.
              The server will calculate final
              product prices and tax during
              checkout.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}