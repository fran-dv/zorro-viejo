import { uploadImage } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/api";

interface UploadMultipleOpts {
  images: { blob: Blob; path: string }[];
}

interface UseUploadImagesReturn {
  error: Error | null;
  isPending: boolean;
  upload: (opts: UploadMultipleOpts) => Promise<string[]>;
}

export const useUploadImages = (): UseUploadImagesReturn => {
  const { mutateAsync, error, isPending } = useMutation({
    mutationFn: async ({ images }: UploadMultipleOpts) => {
      const urls = await Promise.all(
        images.map(async ({ blob, path }) => {
          const uploadData = await uploadImage({ imageBlob: blob, path });
          const { data: publicUrlData } = supabase.storage
            .from("products-images")
            .getPublicUrl(uploadData.path);
          return publicUrlData.publicUrl;
        }),
      );
      return urls;
    },
  });

  return {
    error,
    isPending,
    upload: mutateAsync,
  };
};
