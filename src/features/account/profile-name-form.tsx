"use client";

import { useActionState } from "react";
import { Pencil, LoaderCircle } from "lucide-react";
import { updateProfileNameAction } from "@/features/account/actions";
import { initialProfileNameState } from "@/features/account/profile-name-state";

type ProfileNameFormProps = {
  currentName: string;
};

export function ProfileNameForm({ currentName }: ProfileNameFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfileNameAction,
    initialProfileNameState,
  );

  return (
    <form action={formAction} className="profile-name-form">
      <label>
        <span>Display name</span>
        <input defaultValue={currentName} name="fullName" required type="text" />
      </label>

      <button className="primary-button menu-cta-button" disabled={pending} type="submit">
        {pending ? <LoaderCircle className="checkout-spinner" size={15} /> : <Pencil size={15} />}
        {pending ? "Saving..." : "Save name"}
      </button>

      {state.message ? (
        <p className={state.status === "error" ? "profile-name-message error" : "profile-name-message"} role="status">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
