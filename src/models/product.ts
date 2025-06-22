import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  categoryId: z.number(),
  name: z.string(),
  slug: z.string(),
  price: z.number(),
  offerPrice: z.number().optional(),
  imageUrls: z.array(z.string().url()).nonempty(),
  shortDescription: z.string().optional(),
  description: z.string(),
  inStock: z.boolean(),
  unitsInPackage: z.number(),
  unitVolumeMl: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;
