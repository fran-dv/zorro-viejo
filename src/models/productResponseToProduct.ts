import type { Product, ProductResponse } from "@/models";

export const productResponseToProduct = (
  productResponse: ProductResponse,
): Product => {
  return {
    id: productResponse.id,
    categoryId: productResponse.category_id,
    name: productResponse.name,
    slug: productResponse.slug,
    price: productResponse.price,
    offerPrice: productResponse.offer_price ?? undefined,
    imageUrls: productResponse.image_urls,
    shortDescription: productResponse.short_description ?? undefined,
    description: productResponse.description,
    inStock: true,
    unitsInPackage: productResponse.units_in_package,
    unitVolumeMl: productResponse.unit_volume_ml,
  };
};
