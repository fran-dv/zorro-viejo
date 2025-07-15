import { CategorySchema, type Category } from "@/models";
import { supabase, Tables } from "./supabase-api-data";

export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from(Tables.Categories)
    .select()
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }

  if (!data) return [];

  const categories: Category[] = data.map((cat) => CategorySchema.parse(cat));

  const ofertasIndex = categories.findIndex((cat) => cat.slug === "ofertas");

  if (ofertasIndex === -1) return categories;

  const [ofertasCategory] = categories.splice(ofertasIndex, 1);
  return [ofertasCategory, ...categories];
};
