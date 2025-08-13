import { z } from "zod";
import type { Category } from "@/models";

// API
export const RawProductResponseSchema = z.object({
  id: z.number(),
  category_id: z.number(),
  name: z.string(),
  slug: z.string(),
  price: z.number(),
  offer_price: z.number().optional().nullable(),
  image_urls: z.array(z.string().url()).nonempty(),
  short_description: z.string().or(z.null()),
  description: z.string(),
  in_stock: z.boolean(),
  units_in_package: z.number(),
  unit_volume_ml: z.string(),
});

export type RawProductResponse = z.infer<typeof RawProductResponseSchema>;

// Local
export const BaseProductSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  name: z.string(),
  slug: z.string(),
  price: z.number(),
  offerPrice: z.number().optional().nullable(),
  imageUrls: z.array(z.string().url()).nonempty(),
  shortDescription: z.string().or(z.null()),
  description: z.string(),
  inStock: z.boolean(),
  unitsInPackage: z.number(),
  unitVolumeMl: z.string(),
});

export type BaseProduct = z.infer<typeof BaseProductSchema>;

export const ProductSchema = RawProductResponseSchema.transform((raw) => {
  const product: BaseProduct = {
    id: raw.id,
    categoryId: raw.category_id,
    name: raw.name,
    slug: raw.slug,
    price: raw.price,
    offerPrice:
      raw.offer_price && raw.offer_price > 0 ? raw.offer_price : undefined,
    imageUrls: raw.image_urls,
    shortDescription: raw.short_description,
    description: raw.description,
    inStock: raw.in_stock,
    unitsInPackage: raw.units_in_package,
    unitVolumeMl: raw.unit_volume_ml,
  };

  return product;
});

export type Product = z.infer<typeof ProductSchema>;

export const productToRawProductResponse = (
  product: Product,
): RawProductResponse => ({
  id: product.id,
  category_id: product.categoryId,
  name: product.name,
  slug: product.slug,
  price: product.price,
  offer_price: product.offerPrice,
  image_urls: product.imageUrls,
  short_description: product.shortDescription,
  description: product.description,
  in_stock: product.inStock,
  units_in_package: product.unitsInPackage,
  unit_volume_ml: product.unitVolumeMl,
});

export type ProductsByCategory = {
  category: Category;
  products: Product[];
  count: number;
};
