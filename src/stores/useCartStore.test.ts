import { afterAll, beforeEach, describe, expect, test } from "vitest";
import { useCartStore } from "./useCartStore";
import type { Product } from "@/models";

const beer: Product = {
  id: 1,
  name: "Beer",
  price: 10,
  offerPrice: 0,
  slug: "beer",
  description: "Beer",
  categoryId: 1,
  imageUrls: ["https://placeholder.com/beer.jpg"],
  shortDescription: "Beer",
  inStock: true,
  unitsInPackage: 1,
  unitVolumeMl: "100ml",
};

const wine: Product = {
  id: 2,
  name: "Wine",
  price: 20,
  offerPrice: 15,
  slug: "wine",
  description: "Wine",
  categoryId: 1,
  imageUrls: ["https://placeholder.com/wine.jpg"],
  shortDescription: "Wine",
  inStock: true,
  unitsInPackage: 1,
  unitVolumeMl: "100ml",
};

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

afterAll(() => {
  useCartStore.getState().clearCart();
});

describe("cartStore", () => {
  test("adds a new item to the cart", () => {
    const { addItemToCart } = useCartStore.getState();
    const added = addItemToCart(beer);

    expect(added).toBe(true);
    expect(useCartStore.getState().items).toHaveLength(1);
    expect(useCartStore.getState().items[0]).toMatchObject({
      id: beer.id,
      amount: 1,
      product: beer,
    });
  });

  test("does not add duplicate item", () => {
    const { addItemToCart } = useCartStore.getState();
    addItemToCart(beer);
    const addedAgain = addItemToCart(beer);

    expect(addedAgain).toBe(false);
    expect(useCartStore.getState().items).toHaveLength(1);
  });

  test("increments item amount", () => {
    const { addItemToCart, incrementItemAmount } = useCartStore.getState();
    addItemToCart(beer);

    const result = incrementItemAmount(beer.id);
    expect(result).toBe(true);
    expect(useCartStore.getState().items[0].amount).toBe(2);
  });

  test("fails to increment if item does not exist", () => {
    const { incrementItemAmount } = useCartStore.getState();
    const result = incrementItemAmount(999);
    expect(result).toBe(false);
  });

  test("decrements item amount but not below 1", () => {
    const { addItemToCart, decrementItemAmount } = useCartStore.getState();
    addItemToCart(beer);

    const result = decrementItemAmount(beer.id);
    expect(result).toBe(true);
    expect(useCartStore.getState().items[0].amount).toBe(1);
  });

  test("fails to decrement if item does not exist", () => {
    const { decrementItemAmount } = useCartStore.getState();
    const result = decrementItemAmount(999);
    expect(result).toBe(false);
  });

  test("removes item from the cart", () => {
    const { addItemToCart, removeItem, items } = useCartStore.getState();
    addItemToCart(beer);

    const result = removeItem(beer.id);
    expect(result).toBe(true);
    expect(items).toHaveLength(0);
  });

  test("fails to remove if item does not exist", () => {
    const { removeItem } = useCartStore.getState();
    const result = removeItem(999);
    expect(result).toBe(false);
  });

  test("clears the cart", () => {
    const { addItemToCart, clearCart, items } = useCartStore.getState();
    addItemToCart(beer);
    addItemToCart(wine);

    clearCart();
    expect(items).toHaveLength(0);
  });

  test("calculates total price without discounts", () => {
    const { addItemToCart, getTotalPrice } = useCartStore.getState();
    addItemToCart(beer); // price 10
    addItemToCart({ ...beer, id: 3 }); // another 10

    expect(getTotalPrice()).toBe(20);
  });

  test("calculates total price with offerPrice applied", () => {
    const { addItemToCart, getTotalPrice } = useCartStore.getState();
    addItemToCart(wine); // offerPrice 15
    expect(getTotalPrice()).toBe(15);
  });

  test("calculates total with multiple items and amounts", () => {
    const { addItemToCart, incrementItemAmount, getTotalPrice } =
      useCartStore.getState();

    addItemToCart(beer); // 10
    incrementItemAmount(beer.id); // now 2 * 10 = 20
    addItemToCart(wine); // +15

    expect(getTotalPrice()).toBe(35);
  });
});
