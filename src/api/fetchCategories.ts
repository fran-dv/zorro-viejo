import { CategorySchema, type Category } from "@/models";
import { supabase, Tables } from "./supabase-api-data";

export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from(Tables.Categories).select();

  if (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }

  const categories = Array.isArray(data) ? data : [data];
  return categories.map((cat) => CategorySchema.parse(cat));
};
