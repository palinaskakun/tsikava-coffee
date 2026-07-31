"use client";

import { useFormStatus } from "react-dom";
import {
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

export function CheckoutSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="primary-button checkout-submit-button"
      disabled={pending}
      type="submit"
    >
      {pending ? (
        <>
          <LoaderCircle
            className="checkout-spinner"
            size={18}
          />
          Placing order...
        </>
      ) : (
        <>
          Place test order
          <ArrowRight size={18} />
        </>
      )}
    </button>
  );
}