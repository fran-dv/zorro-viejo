import { type Product } from "@/models";
import { supabase, Tables } from "@/api";
import { parseProduct } from "@/utils";

interface FetchOpts {
  slug: string;
}

export const fetchProductBySlug = async ({
  slug,
}: FetchOpts): Promise<Product | null> => {
  const { data, error } = await supabase
    .from(Tables.Products)
    .select()
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(`Network error: ${error.message}`);
  }

  if (!data) return null;

  return parseProduct(data, 0);
};
