import { supabase } from "@/api";

export const deleteProductImages = async (slug: string) => {
  const { data, error } = await supabase.storage
    .from("products-images")
    .list("", { search: `${slug}.` });

  if (error) throw error;

  if (!data || data.length === 0) return;

  const pathsToDelete = data.map((file) => file.name);

  const { error: removeError } = await supabase.storage
    .from("products-images")
    .remove(pathsToDelete);

  if (removeError) throw removeError;
};
