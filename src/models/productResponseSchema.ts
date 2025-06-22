import { z } from "zod";

export const ProductResponseSchema = z.object({
  id: z.number(),
  category_id: z.number(),
  name: z.string(),
  slug: z.string(),
  price: z.number(),
  offer_price: z.number().optional(),
  image_urls: z.array(z.string().url()).nonempty(),
  short_description: z.string().optional(),
  description: z.string(),
  in_stock: z.boolean(),
  units_in_package: z.number(),
  unit_volume_ml: z.number(),
});

export type ProductResponse = z.infer<typeof ProductResponseSchema>;
