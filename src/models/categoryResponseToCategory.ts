import type { Category, CategoryResponse } from "@/models";

export const categoryResponseToCategory = (
  categoryResponse: CategoryResponse,
): Category => {
  return {
    id: categoryResponse.id,
    name: categoryResponse.name,
    slug: categoryResponse.slug,
  };
};
