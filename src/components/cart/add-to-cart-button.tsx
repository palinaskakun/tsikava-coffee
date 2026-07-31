"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import type { DrinkArtwork } from "@/components/menu/drink-illustration";
import { useCartStore } from "@/stores/cart-store";

type AddToCartButtonProps = {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    artwork: DrinkArtwork;
  };
};

export function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const addItem = useCartStore(
    (state) => state.addItem,
  );

  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      basePrice: product.price,
      artwork: product.artwork,
      selectedOptions: [],
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1000);
  }

  return (
    <button
      aria-label={`Add ${product.name} to cart`}
      className="add-button"
      onClick={handleAdd}
      type="button"
    >
      {added ? (
        <>
          <Check size={17} />
          Added
        </>
      ) : (
        <>
          <Plus size={17} />
          Add
        </>
      )}
    </button>
  );
}