import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchRelatedProducts } from "@/api";
import type { Product } from "@/models";

interface Props {
  product: Product | null;
  limit: number;
  enabled?: boolean;
}

export const useRelatedProducts = ({
  product,
  limit,
  enabled = true,
}: Props) => {
  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: ["related products", product, limit],
    queryFn: async () =>
      await fetchRelatedProducts({ product: product ?? undefined, limit }),
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 60_000,
    retry: 3,
    retryDelay: (retryAttempt) => 1000 * Math.min(2 ** retryAttempt, 30),
  });

  return {
    isPending,
    error,
    data,
    isFetching,
    isLoading,
  };
};
