import { fetchCategories } from "@/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await fetchCategories(),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    retry: 1,
  });

  return {
    isPending,
    error,
    data,
    isFetching,
    isLoading,
  };
};
