import { GlobalContext } from "@/context";
import { useCategories } from "@/hooks";
import type { Category } from "@/models";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { data, error, isFetching, refetch } = useCategories();

  useEffect(() => {
    if (!data) return;
    setCategories(data as Category[]);
  }, [data, setCategories]);

  return (
    <GlobalContext.Provider
      value={{
        categories,
        errorFetchingCategories: error,
        isFetchingCategories: isFetching,
        setCategories,
        refetchCategories: refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
