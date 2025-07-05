import { createContext, useContext } from "react";

export const FooterContext = createContext<
  React.RefObject<HTMLElement | null> | undefined
>(undefined);

export const useFooterContext = () => {
  const context = useContext(FooterContext);

  if (!context) {
    throw new Error(
      "useFooterContext must be used within a FooterContextProvider",
    );
  }

  return context;
};
