import type { Product, ProductResponse } from "@/models";

export const productResponseToProduct = (
  productResponse: ProductResponse,
): Product => {
  return {
    id: productResponse.id,
    categoryId: 0,
    name: productResponse.name,
    slug: productResponse.slug,
    price: productResponse.price,
    offerPrice: undefined,
    imageUrls: productResponse.image_urls,
    shortDescription: productResponse.short_description,
    description: productResponse.description,
    inStock: true,
    unitsInPackage: productResponse.units_in_package,
    unitVolumeMl: productResponse.unit_volume_ml,
  };
};
