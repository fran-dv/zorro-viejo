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

export type ProductsByCategoryFetch = CategoryProducts[];

export const fetchProducts = async ({
  limitPerCategory,
  categoriesIds,
  page = 1,
}: FetchOpts): Promise<ProductsByCategoryFetch> => {
  if (!navigator.onLine) {
    throw new Error("No hay conexión a internet");
  }

  const results: ProductsByCategoryFetch = [];

  for (const id of categoriesIds) {
    const { data, error, count, status } = await supabase
      .from(Tables.Products)
      .select("*", { count: "exact", head: false })
      .eq("category_id", id)
      .range((page - 1) * limitPerCategory, page * limitPerCategory - 1)
      .order("name", { ascending: true });

    if (status === 0 || !navigator.onLine) {
      throw new Error("Error de red. Verifica tu conexión a internet");
    }

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("Error obteniendo productos");
    }

    const products = Array.isArray(data) ? data : [data];
    const localProducts = products
      .map((prod, i) => parseProduct(prod, i))
      .filter(Boolean) as Product[];

    results.push({
      categoryId: id,
      products: localProducts,
      count: count ?? 0,
    });
  }

  return results;
};
