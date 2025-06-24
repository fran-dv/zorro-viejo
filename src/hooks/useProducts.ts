import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api";

interface Props {
  limitPerCategory: number;
  categoriesIds: number[];
}

export const useProducts = ({ limitPerCategory, categoriesIds }: Props) => {
  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: ["products", categoriesIds, limitPerCategory],
    queryFn: async () =>
      await fetchProducts({ categoriesIds, limitPerCategory }),
    placeholderData: keepPreviousData,
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
