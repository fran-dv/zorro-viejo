import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { deleteProductImages } from "@/api";

interface DeleteMultipleOpts {
  slugs: string[];
}

interface UseDeleteImagesReturn {
  error: Error | null;
  isPending: boolean;
  delete: UseMutateFunction<void, Error, DeleteMultipleOpts, unknown>;
}

export const useDeleteImages = (): UseDeleteImagesReturn => {
  const { mutate, error, isPending } = useMutation({
    mutationKey: ["delete-images"],
    mutationFn: async ({ slugs }: DeleteMultipleOpts) => {
      await Promise.all(slugs.map(async (slug) => deleteProductImages(slug)));
    },
  });

  return {
    error,
    isPending,
    delete: mutate,
  };
};
