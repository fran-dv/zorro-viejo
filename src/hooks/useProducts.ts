import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api";

interface Props {
  limitPerCategory: number;
  categoriesIds: number[];
  page: number;
}

export const useProducts = ({
  limitPerCategory,
  categoriesIds,
  page,
}: Props) => {
  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: ["products", categoriesIds, limitPerCategory, page],
    queryFn: async () =>
      await fetchProducts({ categoriesIds, limitPerCategory, page }),
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
