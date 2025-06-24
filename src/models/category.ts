import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;

export const AllCategory: Category = {
  id: 0,
  name: "Todas",
  slug: "todas",
};
