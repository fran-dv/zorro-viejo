import { useContext, createContext } from "react";
import type { Category } from "@/models";

interface GlobalContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export const EmptyGlobalState: Category[] = [];

export const GlobalContext = createContext<GlobalContextType>({
  categories: EmptyGlobalState,
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
