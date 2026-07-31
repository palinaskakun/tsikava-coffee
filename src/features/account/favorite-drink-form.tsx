"use client";

import { useActionState } from "react";
import {
  Check,
  Heart,
  LoaderCircle,
} from "lucide-react";
import { updateFavoriteDrinkAction } from "@/features/account/actions";
import { initialFavoriteDrinkState } from "@/features/account/favorite-drink-state";

type ProductOption = {
  id: string;
  name: string;
};

type FavoriteDrinkFormProps = {
  products: ProductOption[];
  currentFavoriteId: string | null;
};

export function FavoriteDrinkForm({
  products,
  currentFavoriteId,
}: FavoriteDrinkFormProps) {
  const [state, formAction, pending] = useActionState(
    updateFavoriteDrinkAction,
    initialFavoriteDrinkState,
  );

  return (
    <form
      action={formAction}
      className="favorite-drink-form"
    >
      <div className="favorite-form-heading">
        <div className="favorite-form-icon">
          <Heart size={20} />
        </div>

        <div>
          <h2>Choose your favorite</h2>

          <p>
            This selection is saved to your TSIKAVA profile.
          </p>
        </div>
      </div>

      <label className="favorite-select-field">
        <span>Favorite drink</span>

        <select
          defaultValue={currentFavoriteId ?? ""}
          name="productId"
          required
        >
          <option disabled value="">
            Select a drink
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>
          ))}
        </select>
      </label>

      <button
        className="primary-button favorite-submit-button"
        disabled={pending}
        type="submit"
      >
        {pending ? (
          <>
            <LoaderCircle
              className="checkout-spinner"
              size={17}
            />
            Saving...
          </>
        ) : (
          <>
            <Check size={17} />
            Save favorite
          </>
        )}
      </button>

      {state.message ? (
        <p
          className={
            state.status === "error"
              ? "favorite-message favorite-message-error"
              : "favorite-message favorite-message-success"
          }
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}