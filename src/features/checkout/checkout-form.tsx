"use client";

import {
  useActionState,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  LockKeyhole,
  ReceiptText,
  ShoppingBag,
} from "lucide-react";
import { CheckoutSubmitButton } from "@/features/checkout/checkout-submit-button";
import { placeOrderAction } from "@/features/checkout/actions";
import { initialCheckoutState } from "@/features/checkout/checkout-state";
import { useCartStore } from "@/stores/cart-store";

type CheckoutFormProps = {
  defaultName: string;
  defaultEmail: string;
  isAuthenticated: boolean;
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function CheckoutForm({
  defaultName,
  defaultEmail,
  isAuthenticated,
}: CheckoutFormProps) {
  const router = useRouter();

  const items = useCartStore(
    (state) => state.items,
  );

  const clearCart = useCartStore(
    (state) => state.clearCart,
  );

  const [hydrated, setHydrated] =
    useState(false);

  const [state, formAction] = useActionState(
    placeOrderAction,
    initialCheckoutState,
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (
      state.status === "success" &&
      state.checkoutUrl
    ) {
      window.location.assign(
        state.checkoutUrl,
      );
    }
  }, [
    state.status,
    state.checkoutUrl,
  ]);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total + item.unitPrice * item.quantity,
        0,
      ),
    [items],
  );

  const estimatedTax = subtotal * 0.06;
  const estimatedTotal =
    subtotal + estimatedTax;

const serializedCart = JSON.stringify(
  items.map((item) => ({
    slug: item.slug,
    quantity: item.quantity,
    selectedOptions: item.selectedOptions.map(
      (option) => option.id,
    ),
  })),
);

  if (!hydrated) {
    return (
      <main className="page-main">
        <section className="simple-page-section page-shell">
          <p className="checkout-loading">
            Loading checkout...
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
              Checkout
            </p>

            <h1>Your cart is empty.</h1>

            <p>
              Add at least one drink before
              continuing to checkout.
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
    <main className="page-main checkout-page">
      <section className="page-shell checkout-heading">
        <p className="eyebrow">
          <ReceiptText size={16} />
          Test checkout
        </p>

        <h1>Finish your order.</h1>


      </section>

      <section className="page-shell checkout-layout">
        <form
          action={formAction}
          className="checkout-form-card"
        >
          <input
            name="cart"
            type="hidden"
            value={serializedCart}
          />

          <div className="checkout-section-heading">
            <span>01</span>

            <div>
              <h2>Account details</h2>
              <p>
                Your saved name and email are used for this order.
                You can update your name in Account.
              </p>
            </div>
          </div>

          {state.message ? (
            <div
              className={
                state.status === "error"
                  ? "checkout-message checkout-message-error"
                  : "checkout-message checkout-message-success"
              }
              role={
                state.status === "error"
                  ? "alert"
                  : "status"
              }
            >
              {state.message}
            </div>
          ) : null}

          <div className="checkout-field-grid">
            <label className="checkout-field">
              <span>Name</span>

              <input
                defaultValue={defaultName}
                name="customerName"
                readOnly
                required
                type="text"
              />

              {state.fieldErrors?.customerName?.map(
                (error) => (
                  <small
                    className="checkout-field-error"
                    key={error}
                  >
                    {error}
                  </small>
                ),
              )}
            </label>

            <label className="checkout-field">
              <span>Email</span>

              <input
                defaultValue={defaultEmail}
                name="customerEmail"
                readOnly
                required
                type="email"
              />

              {state.fieldErrors?.customerEmail?.map(
                (error) => (
                  <small
                    className="checkout-field-error"
                    key={error}
                  >
                    {error}
                  </small>
                ),
              )}
            </label>
          </div>

          <div className="checkout-divider" />

          <div className="checkout-section-heading">
            <span>02</span>

            <div>
              <h2>Pickup details</h2>
              <p>
                Choose an approximate preparation
                window for this prototype.
              </p>
            </div>
          </div>

          <label className="checkout-field">
            <span>
              <Clock3 size={16} />
              Pickup time
            </span>

            <select
              defaultValue="15"
              name="pickupMinutes"
              required
            >
              <option value="15">
                In approximately 15 minutes
              </option>

              <option value="30">
                In approximately 30 minutes
              </option>

              <option value="45">
                In approximately 45 minutes
              </option>

              <option value="60">
                In approximately 1 hour
              </option>
            </select>

            {state.fieldErrors?.pickupMinutes?.map(
              (error) => (
                <small
                  className="checkout-field-error"
                  key={error}
                >
                  {error}
                </small>
              ),
            )}
          </label>

          <label className="checkout-field">
            <span>Order notes</span>

            <textarea
              maxLength={500}
              name="customerNotes"
              placeholder="For example: no straw, please."
              rows={5}
            />

            {state.fieldErrors?.customerNotes?.map(
              (error) => (
                <small
                  className="checkout-field-error"
                  key={error}
                >
                  {error}
                </small>
              ),
            )}
          </label>

          {state.fieldErrors?.cart?.map(
            (error) => (
              <p
                className="checkout-field-error"
                key={error}
              >
                {error}
              </p>
            ),
          )}

          <div className="checkout-security-note">
            <LockKeyhole size={19} />

            <div>
              <strong>
                Server-verified order
              </strong>

              <p>
                Product names and prices are
                retrieved again from Supabase
                before the order is created.
              </p>
            </div>
          </div>

          <CheckoutSubmitButton />

          {!isAuthenticated ? (
            <p className="checkout-account-note">
              You are checking out as a guest.{" "}
              <Link href="/auth/login">
                Log in
              </Link>{" "}
              to connect the order to your
              account.
            </p>
          ) : (
            <p className="checkout-account-note">
  This order will be saved to your TSIKAVA account.
  You will be redirected to Stripe’s sandbox checkout.
</p>
          )}
        </form>

        <aside className="checkout-summary">
          <p className="checkout-summary-label">
            Order summary
          </p>

          <h2>Your drinks</h2>

          <div className="checkout-summary-items">
            {items.map((item) => (
              <div
                className="checkout-summary-item"
                key={item.cartItemId}
              >
                <div>
                  <strong>{item.name}</strong>

                  {item.selectedOptions.length > 0 ? (
                    <small className="checkout-item-options">
                      {item.selectedOptions
                        .map((option) => option.name)
                        .join(" · ")}
                    </small>
                  ) : null}

                  <span>
                    {item.quantity} ×{" "}
                    {formatPrice(item.unitPrice)}
                  </span>
                </div>

                <strong>
                  {formatPrice(
                    item.unitPrice * item.quantity,
                  )}
                </strong>
              </div>
            ))}
          </div>

          <div className="checkout-summary-calculation">
            <div>
              <span>Displayed subtotal</span>
              <strong>
                {formatPrice(subtotal)}
              </strong>
            </div>

            <div>
              <span>Estimated demo tax</span>
              <strong>
                {formatPrice(estimatedTax)}
              </strong>
            </div>
          </div>

          <div className="checkout-summary-total">
            <span>Estimated total</span>

            <strong>
              {formatPrice(estimatedTotal)}
            </strong>
          </div>

          <p className="checkout-summary-disclaimer">
            The final values saved to the order
            are calculated from current database
            prices, not from this display.
          </p>

          <Link
            className="checkout-edit-cart"
            href="/cart"
          >
            <ArrowLeft size={16} />
            Edit cart
          </Link>
        </aside>
      </section>
    </main>
  );
}
