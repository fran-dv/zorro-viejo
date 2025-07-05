import { type Product } from "@/models";
import { supabase, Tables } from "@/api";
import { parseProduct } from "@/utils";

interface FetchRelatedOpts {
  product?: Product;
  limit?: number;
}

export const fetchRelatedProducts = async ({
  product,
  limit = 5,
}: FetchRelatedOpts): Promise<Product[]> => {
  if (!product) return [];

  const results = [];
  const excludedIds = [];

  const priceRange = [
    Math.round(product.price * 0.7),
    Math.round(product.price * 2),
  ];
  const { data: similarPriceData, error } = await supabase
    .from(Tables.Products)
    .select()
    .eq("category_id", product.categoryId)
    .gte("price", priceRange[0])
    .lte("price", priceRange[1])
    .not("id", "eq", product.id)
    .limit(limit);

  if (error) {
    throw new Error(`Network error: ${error.message}`);
  }

  if (similarPriceData) {
    results.push(...similarPriceData);
    excludedIds.push(...similarPriceData.map((p) => p.id));
  }

  if (results.length < limit || !similarPriceData) {
    const { data: sameCategoryData } = await supabase
      .from(Tables.Products)
      .select()
      .eq("category_id", product.categoryId)
      .not("id", "in", `(${excludedIds.join(",")})`)
      .not("id", "eq", product.id)
      .limit(limit - results.length);

    if (sameCategoryData) {
      results.push(...sameCategoryData);
    }
  }

  return results.map((p, i) => parseProduct(p, i)) as Product[];
};
