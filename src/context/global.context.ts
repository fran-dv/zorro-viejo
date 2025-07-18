import { useContext, createContext } from "react";
import type { Category } from "@/models";

interface GlobalContextType {
  categories: Category[];
  errorFetchingCategories: Error | null;
  refetchCategories: () => void;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  isFetchingCategories: boolean;
}

export const GlobalContext = createContext<GlobalContextType>({
  categories: [] as Category[],
  errorFetchingCategories: null,
  isFetchingCategories: false,
  refetchCategories: () => {},
  setCategories: () => {},
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider",
    );
  }

  return context;
};
