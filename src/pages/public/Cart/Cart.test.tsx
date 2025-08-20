import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Cart } from "./Cart";
import { useCartStore } from "@/stores";
import type { CartItem } from "@/models";
import { MemoryRouter, useNavigate } from "react-router-dom";

// Mock navigate
vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockNavigate = vi.fn();

beforeEach(() => {
  // Reset store state before each test
  useCartStore.setState({ items: [] });
  (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
});

const mockItem: CartItem = {
  id: 1,
  product: {
    id: 1,
    name: "Cerveza Artesanal",
    slug: "cerveza-artesanal",
    description: "Una cerveza artesanal rubia",
    shortDescription: "Cerveza rubia",
    price: 200,
    offerPrice: 150,
    unitVolumeMl: "500",
    unitsInPackage: 6,
    imageUrls: ["https://placeholder.com/beer.png"],
    categoryId: 1,
    inStock: true,
  },
  amount: 1,
};

describe("Cart", () => {
  it("renders empty cart message when no items", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    expect(
      screen.getByText("No hay productos en el carrito :("),
    ).toBeInTheDocument();
    expect(screen.getByText("Explorar bebidas")).toBeInTheDocument();
  });

  it("renders cart items when present", () => {
    useCartStore.setState({ items: [mockItem] });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    expect(screen.getByText(mockItem.product.name)).toBeInTheDocument();

    expect(screen.getByText(/6/)).toBeInTheDocument();
    expect(screen.getByText(/500ml/)).toBeInTheDocument();
  });

  it("increments item amount when + button clicked", () => {
    useCartStore.setState({ items: [mockItem] });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    const incrementBtn = screen.getByRole("button", { name: /Incrementar/i });
    fireEvent.click(incrementBtn);

    const state = useCartStore.getState();
    expect(state.items[0].amount).toBe(2);
  });

  it("decrements item amount when - button clicked", () => {
    useCartStore.setState({ items: [{ ...mockItem, amount: 2 }] });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    const decrementBtn = screen.getByRole("button", { name: /Decrementar/i });
    fireEvent.click(decrementBtn);

    const state = useCartStore.getState();
    expect(state.items[0].amount).toBe(1);
  });

  it("removes item when delete button clicked", () => {
    useCartStore.setState({ items: [mockItem] });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    const deleteBtn = screen.getByRole("button", { name: /Eliminar/i });
    fireEvent.click(deleteBtn);

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
  });

  it("shows correct total price", () => {
    useCartStore.setState({ items: [mockItem] });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/150/)).toHaveLength(2);
  });

  it("navigates to checkout when checkout button clicked", () => {
    useCartStore.setState({ items: [mockItem] });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    const checkoutBtn = screen.getByRole("button", { name: /Proceder/i });
    fireEvent.click(checkoutBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/checkout");
  });
});
