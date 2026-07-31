"use client";

import { useActionState } from "react";
import { registerAction } from "@/features/auth/actions";
import { initialAuthState } from "@/features/auth/auth-state";
import { SubmitButton } from "@/features/auth/submit-button";

export function RegisterForm() {
  const [state, formAction] = useActionState(
    registerAction,
    initialAuthState,
  );

  return (
    <form action={formAction} className="auth-form">
      {state.message ? (
        <div
          className={
            state.status === "error"
              ? "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              : "rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900"
          }
          role="status"
        >
          {state.message}
        </div>
      ) : null}

      <label>
        Full name

        <input
          autoComplete="name"
          name="fullName"
          placeholder="Your name"
          required
          type="text"
        />

        {state.fieldErrors?.fullName?.map((error) => (
          <span
            className="text-sm font-normal text-red-700"
            key={error}
          >
            {error}
          </span>
        ))}
      </label>

      <label>
        Email address

        <input
          autoComplete="email"
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />

        {state.fieldErrors?.email?.map((error) => (
          <span
            className="text-sm font-normal text-red-700"
            key={error}
          >
            {error}
          </span>
        ))}
      </label>

      <label>
        Password

        <input
          autoComplete="new-password"
          minLength={8}
          name="password"
          placeholder="At least 8 characters"
          required
          type="password"
        />

        {state.fieldErrors?.password?.map((error) => (
          <span
            className="text-sm font-normal text-red-700"
            key={error}
          >
            {error}
          </span>
        ))}
      </label>

      <SubmitButton
        idleLabel="Create account"
        pendingLabel="Creating account..."
      />
    </form>
  );
}