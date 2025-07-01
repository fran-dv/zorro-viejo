import { type Product } from "@/models";
import { supabase, Tables } from "@/api";
import { parseProduct } from "@/utils";

interface FetchOpts {
  slug: string;
}

interface fetchProductBySlugResponse {
  product: Product | null;
  similarProducts: Product[] | null;
}

export const fetchProductBySlug = async ({
  slug,
}: FetchOpts): Promise<fetchProductBySlugResponse> => {
  const { data, error } = await supabase
    .from(Tables.Products)
    .select()
    .eq("slug", slug)
    .single();

  if (!data || error) {
    const { data, error } = await supabase
      .from(Tables.Products)
      .select()
      .ilike("slug", `%${slug}%`)
      .limit(10)
      .order("name", { ascending: true });

    if (error) {
      throw new Error(`Network error: ${error.message}`);
    }

    const similarProducts = Array.isArray(data)
      ? data.map((p, i) => parseProduct(p, i) as Product)
      : [parseProduct(data, 0) as Product];

    return {
      product: null,
      similarProducts: similarProducts.length > 0 ? similarProducts : null,
    };
  }

  return {
    product: parseProduct(data, 0),
    similarProducts: null,
  };
};
