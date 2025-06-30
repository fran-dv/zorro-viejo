import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProductBySlug } from "@/api";

interface Props {
  slug: string;
}

export const useProductBySlug = ({ slug }: Props) => {
  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => await fetchProductBySlug({ slug }),
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
