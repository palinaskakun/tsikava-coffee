"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  Check,
  ShoppingBag,
} from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

export function HeaderCartLink() {
  const items = useCartStore(
    (state) => state.items,
  );

  const [hydrated, setHydrated] =
    useState(() =>
      useCartStore.persist.hasHydrated(),
    );

  const [isBumping, setIsBumping] =
    useState(false);

  const [showConfirmation, setShowConfirmation] =
    useState(false);

  const previousQuantity = useRef<number | null>(null);

  useEffect(() => {
    if (useCartStore.persist.hasHydrated()) {
      setHydrated(true);
      return;
    }

    return useCartStore.persist.onFinishHydration(
      () => setHydrated(true),
    );
  }, []);

  const totalQuantity = hydrated
    ? items.reduce(
        (total, item) =>
          total + item.quantity,
        0,
      )
    : 0;

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const previous =
      previousQuantity.current;

    // Restoring persisted cart items after a refresh is not a new add.
    if (previous === null) {
      previousQuantity.current = totalQuantity;
      return;
    }

    if (totalQuantity > previous) {
      setIsBumping(false);
      setShowConfirmation(false);

      const animationFrame =
        window.requestAnimationFrame(() => {
          setIsBumping(true);
          setShowConfirmation(true);
        });

      const bumpTimer = window.setTimeout(
        () => {
          setIsBumping(false);
        },
        650,
      );

      const confirmationTimer =
        window.setTimeout(() => {
          setShowConfirmation(false);
        }, 1600);

      previousQuantity.current =
        totalQuantity;

      return () => {
        window.cancelAnimationFrame(
          animationFrame,
        );
        window.clearTimeout(bumpTimer);
        window.clearTimeout(
          confirmationTimer,
        );
      };
    }

    previousQuantity.current =
      totalQuantity;
  }, [hydrated, totalQuantity]);

  return (
    <div className="header-cart-wrapper">
      <Link
        aria-label={`Cart containing ${totalQuantity} items`}
        className={
          isBumping
            ? "cart-button cart-button-bump"
            : "cart-button"
        }
        href="/cart"
      >
        <ShoppingBag
          size={18}
          strokeWidth={2.2}
        />

        <span className="cart-label">
          Cart
        </span>

        <span
          aria-live="polite"
          className={
            isBumping
              ? "cart-count cart-count-bump"
              : "cart-count"
          }
        >
          {totalQuantity}
        </span>
      </Link>

      <div
        aria-live="polite"
        className={
          showConfirmation
            ? "header-cart-confirmation visible"
            : "header-cart-confirmation"
        }
      >
        <Check size={14} />
        Added to cart
      </div>
    </div>
  );
}
