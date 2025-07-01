import { supabase, Tables } from "@/api";
import { removeAccents } from "@/utils";

interface FetchOpts {
  term: string;
  limit: number;
}

interface ProductSearchSuggestion {
  id: number;
  name: string;
  slug: string;
}

export const fetchSearchSuggestions = async ({
  term,
  limit,
}: FetchOpts): Promise<ProductSearchSuggestion[]> => {
  if (!term || term === "") return [];

  const { data: prodSuggestions } = await supabase
    .from(Tables.Products)
    .select("id, name, slug")
    .ilike("name", `%${removeAccents(term)}%`)
    .limit(limit)
    .order("name", { ascending: true });

  return prodSuggestions as ProductSearchSuggestion[];
};
