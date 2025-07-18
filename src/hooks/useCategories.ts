import { fetchCategories } from "@/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNetworkStatus } from "@/hooks";
import { useEffect } from "react";

export const useCategories = () => {
  const { isPending, error, isError, data, isFetching, isLoading, refetch } =
    useQuery({
      queryKey: ["categories"],
      queryFn: async () => await fetchCategories(),
      placeholderData: keepPreviousData,
      staleTime: 60_000,
      retry: 3,
      retryDelay: (retryAttempt) => 1000 * Math.min(2 ** retryAttempt, 30),
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
