import { createContext, useContext } from "react";
import { MainContextValue } from "./index.types";

export const MainContext = createContext<MainContextValue | undefined>(
  undefined
);

export const useMainContext = () => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error(`"useMainContext" must be used within "MainProvider"`);
  }

  return context;
};
