"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
import type { DrinkArtwork } from "@/components/menu/drink-illustration";
import {
  type SelectedCartOption,
  useCartStore,
} from "@/stores/cart-store";

export type ProductOption = {
  id: string;
  name: string;
  additionalPrice: number;
};

export type ProductOptionGroup = {
  id: string;
  name: string;
  selectionType: "single" | "multiple";
  isRequired: boolean;
  minSelections: number;
  maxSelections: number | null;
  options: ProductOption[];
};

type ProductCustomizerProps = {
  product: {
    id: string;
    slug: string;
    name: string;
    basePrice: number;
    artwork: DrinkArtwork;
  };
  optionGroups: ProductOptionGroup[];
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function ProductCustomizer({
  product,
  optionGroups,
}: ProductCustomizerProps) {
  const addItem = useCartStore((state) => state.addItem);

  const initialSelections = Object.fromEntries(
    optionGroups.map((group) => {
      if (
        group.selectionType === "single" &&
        group.options.length > 0
      ) {
        return [group.id, [group.options[0].id]];
      }

      return [group.id, []];
    }),
  ) as Record<string, string[]>;

  const [selections, setSelections] =
    useState<Record<string, string[]>>(initialSelections);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const selectedOptions = useMemo(() => {
    const result: SelectedCartOption[] = [];

    for (const group of optionGroups) {
      const selectedIds = selections[group.id] ?? [];

      for (const option of group.options) {
        if (selectedIds.includes(option.id)) {
          result.push({
            id: option.id,
            groupId: group.id,
            groupName: group.name,
            name: option.name,
            additionalPrice: option.additionalPrice,
          });
        }
      }
    }

    return result;
  }, [optionGroups, selections]);

  const unitPrice = useMemo(() => {
    const optionPrice = selectedOptions.reduce(
      (total, option) => total + option.additionalPrice,
      0,
    );

    return Number(
      (product.basePrice + optionPrice).toFixed(2),
    );
  }, [product.basePrice, selectedOptions]);

  const totalPrice = unitPrice * quantity;

  function selectSingle(groupId: string, optionId: string) {
    setSelections((current) => ({
      ...current,
      [groupId]: [optionId],
    }));
  }

  function toggleMultiple(
    group: ProductOptionGroup,
    optionId: string,
  ) {
    setSelections((current) => {
      const currentIds = current[group.id] ?? [];
      const isSelected = currentIds.includes(optionId);

      if (isSelected) {
        return {
          ...current,
          [group.id]: currentIds.filter(
            (id) => id !== optionId,
          ),
        };
      }

      if (
        group.maxSelections !== null &&
        currentIds.length >= group.maxSelections
      ) {
        return current;
      }

      return {
        ...current,
        [group.id]: [...currentIds, optionId],
      };
    });
  }

  function validateSelections() {
    for (const group of optionGroups) {
      const count = selections[group.id]?.length ?? 0;

      if (group.isRequired && count < group.minSelections) {
        return `Choose an option for ${group.name}.`;
      }

      if (
        group.maxSelections !== null &&
        count > group.maxSelections
      ) {
        return `Choose no more than ${group.maxSelections} options for ${group.name}.`;
      }
    }

    return null;
  }

  function handleAdd() {
    const validationError = validateSelections();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    for (let index = 0; index < quantity; index += 1) {
      addItem({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        basePrice: product.basePrice,
        artwork: product.artwork,
        selectedOptions,
      });
    }

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  return (
    <div className="product-customizer">
      <div className="product-customizer-heading">
        <p className="section-number">
          Make it yours
        </p>

        <h2>Customize your drink</h2>
      </div>

      <div className="customizer-groups">
        {optionGroups.map((group) => (
          <fieldset
            className="customizer-group"
            key={group.id}
          >
            <legend>
              <span>{group.name}</span>

              <small>
                {group.isRequired
                  ? "Choose one"
                  : `Optional${
                      group.maxSelections
                        ? ` · up to ${group.maxSelections}`
                        : ""
                    }`}
              </small>
            </legend>

            <div className="customizer-options">
              {group.options.map((option) => {
                const selected = (
                  selections[group.id] ?? []
                ).includes(option.id);

                return (
                  <button
                    aria-pressed={selected}
                    className={
                      selected
                        ? "customizer-option selected"
                        : "customizer-option"
                    }
                    key={option.id}
                    onClick={() => {
                      if (group.selectionType === "single") {
                        selectSingle(group.id, option.id);
                      } else {
                        toggleMultiple(group, option.id);
                      }
                    }}
                    type="button"
                  >
                    <span className="customizer-option-check">
                      {selected ? <Check size={15} /> : null}
                    </span>

                    <span>{option.name}</span>

                    {option.additionalPrice > 0 ? (
                    <strong>
                      +{formatPrice(option.additionalPrice)}
                    </strong>
                  ) : null}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {error ? (
        <p className="customizer-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="customizer-order-row">
        <div className="customizer-quantity">
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() =>
              setQuantity((current) =>
                Math.max(1, current - 1),
              )
            }
            type="button"
          >
            <Minus size={17} />
          </button>

          <span>{quantity}</span>

          <button
            aria-label="Increase quantity"
            disabled={quantity >= 20}
            onClick={() =>
              setQuantity((current) =>
                Math.min(20, current + 1),
              )
            }
            type="button"
          >
            <Plus size={17} />
          </button>
        </div>

        <div className="customizer-order-actions">
          <button
            className={
              added
                ? "primary-button customizer-add-button customizer-add-button-success"
                : "primary-button customizer-add-button"
            }
            onClick={handleAdd}
            type="button"
          >
            {added ? (
              <>
                <Check size={18} />
                Added to cart
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                Add {quantity} · {formatPrice(totalPrice)}
              </>
            )}
          </button>

          <Link className="customizer-cart-link" href="/cart">
            Go to cart
          </Link>
        </div>
      </div>
            <div
        aria-live="polite"
        className={
          added
            ? "customizer-added-message visible"
            : "customizer-added-message"
        }
      >
        <span>
          <Check size={16} />
        </span>

        <div>
          <strong>Added to cart</strong>
          <p>
            {quantity} × {product.name}
          </p>
        </div>
      </div>
    </div>
  );
}
