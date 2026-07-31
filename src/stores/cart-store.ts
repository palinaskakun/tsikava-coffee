import { create } from "zustand";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";
import type { DrinkArtwork } from "@/components/menu/drink-illustration";

export type SelectedCartOption = {
  id: string;
  groupId: string;
  groupName: string;
  name: string;
  additionalPrice: number;
};

export type CartItem = {
  cartItemId: string;
  productId: string;
  slug: string;
  name: string;
  basePrice: number;
  unitPrice: number;
  artwork: DrinkArtwork;
  selectedOptions: SelectedCartOption[];
  quantity: number;
};

export type AddCartItem = {
  productId: string;
  slug: string;
  name: string;
  basePrice: number;
  artwork: DrinkArtwork;
  selectedOptions: SelectedCartOption[];
};

type CartState = {
  items: CartItem[];
  addItem: (item: AddCartItem) => void;
  increaseQuantity: (cartItemId: string) => void;
  decreaseQuantity: (cartItemId: string) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
};

function createCartItemId(
  productId: string,
  options: SelectedCartOption[] = [],
) {
  const optionKey = options
    .map((option) => option.id)
    .sort()
    .join("|");

  return `${productId}:${optionKey}`;
}

function calculateUnitPrice(
  basePrice: number,
  options: SelectedCartOption[] = [],
) {
  const optionsTotal = options.reduce(
    (total, option) => total + option.additionalPrice,
    0,
  );

  return Number((basePrice + optionsTotal).toFixed(2));
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (newItem) => {
        const cartItemId = createCartItemId(
          newItem.productId,
          newItem.selectedOptions,
        );

        const unitPrice = calculateUnitPrice(
          newItem.basePrice,
          newItem.selectedOptions,
        );

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.cartItemId === cartItemId,
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.cartItemId === cartItemId
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...newItem,
                cartItemId,
                unitPrice,
                quantity: 1,
              },
            ],
          };
        });
      },

      increaseQuantity: (cartItemId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        }));
      },

      decreaseQuantity: (cartItemId) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.cartItemId === cartItemId
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      removeItem: (cartItemId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.cartItemId !== cartItemId,
          ),
        }));
      },

      clearCart: () => {
        set({
          items: [],
        });
      },
    }),
    {
      name: "tsikava-cart-v2",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
);