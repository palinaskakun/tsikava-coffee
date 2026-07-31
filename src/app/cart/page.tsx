import type { Metadata } from "next";
import { CartView } from "@/features/cart/cart-view";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review the drinks in your TSIKAVA order.",
};

export default function CartPage() {
  return <CartView />;
}