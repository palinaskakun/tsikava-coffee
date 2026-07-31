"use client";

import { useFormStatus } from "react-dom";
import { ArrowRight, LoaderCircle } from "lucide-react";

type SubmitButtonProps = {
  idleLabel: string;
  pendingLabel: string;
};

export function SubmitButton({
  idleLabel,
  pendingLabel,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="primary-button form-button"
      disabled={pending}
      type="submit"
    >
      {pending ? (
        <>
          <LoaderCircle
            className="animate-spin"
            size={18}
          />
          {pendingLabel}
        </>
      ) : (
        <>
          {idleLabel}
          <ArrowRight size={18} />
        </>
      )}
    </button>
  );
}