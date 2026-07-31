"use client";

import { useEffect } from "react";
import { useCartStore } from "@/stores/cart-store";

type PaymentSuccessHandlerProps = {
  paymentStatus: string;
};

export function PaymentSuccessHandler({
  paymentStatus,
}: PaymentSuccessHandlerProps) {
  const clearCart = useCartStore(
    (state) => state.clearCart,
  );

  useEffect(() => {
    if (paymentStatus === "paid") {
      clearCart();
    }
  }, [paymentStatus, clearCart]);

  return null;
}