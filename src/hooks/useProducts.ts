import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/api";
import { useNetworkStatus } from "@/hooks";
import { useEffect } from "react";

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
  const { isPending, error, isError, data, isFetching, isLoading, refetch } =
    useQuery({
      queryKey: ["products", categoriesIds, limitPerCategory, page] as const,
      queryFn: async () =>
        await fetchProducts({ categoriesIds, limitPerCategory, page }),
      staleTime: 60_000,
      retry: 3,
      retryDelay: (retryAttempt) => 1000 * Math.min(2 ** retryAttempt, 30),
      networkMode: "always",
      placeholderData: keepPreviousData,
    });

  const isOnline = useNetworkStatus();

  useEffect(() => {
    if (isOnline && (isError || !data)) {
      refetch();
    }
  }, [isOnline, refetch, data, isError]);

  return {
    isPending,
    error,
    isError,
    data,
    isFetching,
    isLoading,
    refetch,
  };
};
