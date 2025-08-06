import type { CartItem, Product } from "@/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  items: CartItem[];
  addItemToCart: (product: Product) => boolean;
  incrementItemAmount: (itemId: number) => boolean;
  decrementItemAmount: (itemId: number) => boolean;
  removeItem: (itemId: number) => boolean;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItemToCart: (product: Product) => {
        const { items } = get();
        const exists = items.some((it) => it.id === product.id);
        if (exists) return false;
        set((state) => ({
          items: [
            ...state.items,
            { id: product.id, amount: 1, product: product },
          ],
        }));
        return true;
      },
      incrementItemAmount: (itemId: number) => {
        const { items } = get();
        const itemIndex = items.findIndex((it) => it.id === itemId);
        if (itemIndex === -1) return false;
        set((state) => ({
          items: state.items.map((it) =>
            it.id === itemId ? { ...it, amount: it.amount + 1 } : it,
          ),
        }));
        return true;
      },
      decrementItemAmount: (itemId: number) => {
        const { items } = get();
        const itemIndex = items.findIndex((it) => it.id === itemId);
        if (itemIndex === -1) return false;
        set((state) => ({
          items: state.items.map((it) =>
            it.id === itemId
              ? { ...it, amount: it.amount === 1 ? it.amount : it.amount - 1 }
              : it,
          ),
        }));
        return true;
      },
      removeItem: (itemId: number) => {
        const { items } = get();
        const itemIndex = items.findIndex((it) => it.id === itemId);
        if (itemIndex === -1) return false;
        set((state) => ({
          items: state.items.filter((it) => it.id !== itemId),
        }));
        return true;
      },
      clearCart: () => {
        set({
          items: [],
        });
      },
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const offerPrice = item.product.offerPrice;
          const price =
            offerPrice && offerPrice > 0 ? offerPrice : item.product.price;
          return total + price * item.amount;
        }, 0);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
