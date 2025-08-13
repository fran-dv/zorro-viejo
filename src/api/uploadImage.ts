import { supabase } from "@/api";

export interface UploadImageOpts {
  imageBlob: Blob;
  path: string;
}

export const uploadImage = async ({ imageBlob, path }: UploadImageOpts) => {
  const { data, error } = await supabase.storage
    .from("products-images")
    .upload(path, imageBlob, {
      upsert: true,
    });

  if (error) throw error;

  return data;
};
