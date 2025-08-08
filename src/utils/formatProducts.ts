import type { Category, Product, RawProductResponse } from "@/models";

export interface FormattedProduct extends Product {
  formattedStock: string;
  categoryName: string;
}

export const FormattedStock = {
  inStock: "En stock",
  outOfStock: "Sin stock",
} as const;

export const formatProducts = (
  products: Product[],
  categories: Category[]
): FormattedProduct[] => {
  return products.map((product) => ({
    ...product,
    formattedStock: product.inStock
      ? FormattedStock.inStock
      : FormattedStock.outOfStock,
    categoryName:
      categories.find((category) => category.id === product.categoryId)?.name ??
      "Sin categoría",
  }));
};

export const formattedProductToProduct = (
  product: FormattedProduct,
  categories: Category[]
): Product => {
  const inStock = product.formattedStock === FormattedStock.inStock;

  return {
    ...product,
    inStock,
    categoryId:
      categories.find((category) => category.name === product.categoryName)
        ?.id ?? -1,
  };
};

export const formattedProductFieldToRawProductField = (
  field: keyof FormattedProduct
): keyof RawProductResponse => {
  switch (field) {
    case "formattedStock":
      return "in_stock";
    case "categoryName":
      return "category_id";
    case "imageUrls":
      return "image_urls";
    case "shortDescription":
      return "short_description";
    case "inStock":
      return "in_stock";
    case "unitsInPackage":
      return "units_in_package";
    case "unitVolumeMl":
      return "unit_volume_ml";
    case "offerPrice":
      return "offer_price";
    case "categoryId":
      return "category_id";
    default:
      return field as keyof RawProductResponse;
  }
};
