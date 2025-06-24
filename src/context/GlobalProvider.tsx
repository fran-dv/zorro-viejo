import { EmptyGlobalState, GlobalContext } from "@/context";
import { useCategories } from "@/hooks";
import type { Category } from "@/models";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<Category[]>(EmptyGlobalState);
  const { data, error } = useCategories();
  if (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  }

  useEffect(() => {
    if (!data) return;
    setCategories(data as Category[]);
  }, [data, setCategories]);

  return (
    <GlobalContext.Provider value={{ categories, setCategories }}>
      {children}
    </GlobalContext.Provider>
  );
};
