import { type Product } from "@/models";
import { supabase, Tables } from "@/api";
import { parseProduct } from "@/utils";

interface FetchOpts {
  limitPerCategory: number;
  categoriesIds: number[];
  page?: number;
}

interface CategoryProducts {
  categoryId: number;
  products: Product[];
  count: number;
}

type ProductsByCategory = CategoryProducts[];

export const fetchProducts = async ({
  limitPerCategory,
  categoriesIds,
  page = 1,
}: FetchOpts): Promise<ProductsByCategory> => {
  const promises = categoriesIds.map(async (id) => {
    const { data, error, count } = await supabase
      .from(Tables.Products)
      .select("*", { count: "exact", head: false })
      .eq("category_id", id)
      .range((page - 1) * limitPerCategory, page * limitPerCategory - 1)
      .order("name", { ascending: true });

    if (error) {
      throw new Error(`Network error: ${error.message}`);
    }

    const products = Array.isArray(data) ? data : [data];
    const localProducts = products
      .map((prod, i) => parseProduct(prod, i))
      .filter(Boolean) as Product[];

    return { categoryId: id, products: localProducts, count: count ?? 0 };
  });

  return await Promise.all(promises);
};
