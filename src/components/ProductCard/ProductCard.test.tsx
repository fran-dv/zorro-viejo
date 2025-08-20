import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/models";

const mockProduct: Product = {
  id: 1,
  name: "Cerveza Artesanal",
  slug: "cerveza-artesanal",
  description: "Una cerveza artesanal rubia, refrescante y ligera",
  shortDescription: "Cerveza artesanal rubia",
  price: 200,
  offerPrice: 150,
  unitVolumeMl: "500",
  unitsInPackage: 6,
  imageUrls: ["https://placeholder.com/beer.png"],
  categoryId: 1,
  inStock: true,
} as Product;

describe("ProductCard", () => {
  it("shows skeletons and hides product content when isLoading is true", () => {
    const { container } = render(
      <ProductCard product={mockProduct} isLoading />,
    );

    const skeletonEl = container.querySelector(".react-loading-skeleton");
    expect(skeletonEl).toBeInTheDocument();

    expect(screen.queryByText(mockProduct.name)).toBeNull();
    expect(
      screen.queryByText(
        `${mockProduct.unitsInPackage} x ${mockProduct.unitVolumeMl}ml`,
      ),
    ).toBeNull();
    expect(
      screen.queryByRole("img", { name: `Imagen de ${mockProduct.name}` }),
    ).toBeNull();
  });

  it("renders product info correctly when not loading", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("img", { name: `Imagen de ${mockProduct.name}` }),
    ).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(
      screen.getByText(mockProduct.shortDescription as string),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        `${mockProduct.unitsInPackage} x ${mockProduct.unitVolumeMl}ml`,
      ),
    ).toBeInTheDocument();
  });

  it("calls onClick when the card is clicked", () => {
    const onClick = vi.fn();
    render(<ProductCard product={mockProduct} onClick={onClick} />);

    fireEvent.click(screen.getByText(mockProduct.name));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("calls onAddToCartClick when the ActionButton is clicked and prevents propagation", () => {
    const onAddToCartClick = vi.fn();
    const onClick = vi.fn();

    render(
      <ProductCard
        product={mockProduct}
        onClick={onClick}
        onAddToCartClick={onAddToCartClick}
      />,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onAddToCartClick).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders offer price if provided", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByText((content) =>
        content.includes(String(mockProduct.offerPrice)),
      ),
    ).toBeInTheDocument();
  });

  it("renders normal price when there is no offerPrice", () => {
    const withoutOffer = { ...mockProduct, offerPrice: undefined };
    render(<ProductCard product={withoutOffer} />);

    expect(
      screen.getByText((c) => c.includes(String(withoutOffer.price))),
    ).toBeInTheDocument();
  });
});
