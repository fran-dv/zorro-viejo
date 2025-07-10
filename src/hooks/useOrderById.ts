import { useQuery } from "@tanstack/react-query";
import { fetchOrderById } from "@/api";

interface Props {
  id: string;
}

export const useOrderById = ({ id }: Props) => {
  const { isPending, error, data, isFetching, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => await fetchOrderById({ id }),
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
