"use client";

import { useActionState, useMemo, useState } from "react";
import {
  Check,
  Heart,
  LoaderCircle,
} from "lucide-react";
import {
  DrinkIllustration,
  type DrinkArtwork,
} from "@/components/menu/drink-illustration";
import { updateFavoriteDrinkAction } from "@/features/account/actions";
import { initialFavoriteDrinkState } from "@/features/account/favorite-drink-state";

type ProductOption = {
  id: string;
  name: string;
  artwork: string;
};

type FavoriteDrinkFormProps = {
  products: ProductOption[];
  currentFavoriteId: string | null;
};

export function FavoriteDrinkForm({
  products,
  currentFavoriteId,
}: FavoriteDrinkFormProps) {
  const [selectedProductId, setSelectedProductId] = useState(
    currentFavoriteId ?? "",
  );

  const [state, formAction, pending] = useActionState(
    updateFavoriteDrinkAction,
    initialFavoriteDrinkState,
  );

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId),
    [products, selectedProductId],
  );

  const artwork: DrinkArtwork = isDrinkArtwork(selectedProduct?.artwork)
    ? selectedProduct.artwork
    : "cornflower";

  return (
    <form
      action={formAction}
      className="favorite-drink-form"
    >
      <div className="favorite-art-preview" aria-hidden="true">
        <DrinkIllustration artwork={artwork} compact />
      </div>

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
          onChange={(event) => setSelectedProductId(event.target.value)}
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

function isDrinkArtwork(value: string | undefined): value is DrinkArtwork {
  return [
    "cornflower",
    "cherry",
    "honey",
    "matcha",
    "mocha",
    "classic",
    "berry",
    "kupalle",
    "birch",
  ].includes(value ?? "");
}
