"use client";

import { useActionState } from "react";
import { loginAction } from "@/features/auth/actions";
import { initialAuthState } from "@/features/auth/auth-state";
import { SubmitButton } from "@/features/auth/submit-button";

type LoginFormProps = {
  nextPath?: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const [state, formAction] = useActionState(
    loginAction,
    initialAuthState,
  );

  return (
    <form action={formAction} className="auth-form">
      {nextPath ? (
        <input name="next" type="hidden" value={nextPath} />
      ) : null}

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
          autoComplete="current-password"
          name="password"
          placeholder="Enter your password"
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
        idleLabel="Log in"
        pendingLabel="Logging in..."
      />
    </form>
  );
}
