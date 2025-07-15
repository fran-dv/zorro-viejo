import { z } from "zod";

// API
export const RawCategoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  image_url: z.string().url().nullable(),
});

export type RawCategoryResponse = z.infer<typeof RawCategoryResponseSchema>;

// Local
export const CategorySchema = RawCategoryResponseSchema.transform((raw) => {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    imageUrl: raw.image_url,
  };
});

export type Category = z.infer<typeof CategorySchema>;

export const AllCategory: Category = {
  id: 0,
  name: "Todas",
  slug: "todas",
  imageUrl: "",
};
