import { fetchCategories } from "@/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await fetchCategories(),
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
