import { useQuery } from "@tanstack/react-query";
import { fetchSearchSuggestions } from "@/api";

interface Props {
  limit: number;
  term: string;
}

export const useSearchSuggestions = ({ limit, term }: Props) => {
  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: ["search", term, limit],
    queryFn: async () => await fetchSearchSuggestions({ term, limit }),
    placeholderData: [],
    staleTime: Infinity,
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
