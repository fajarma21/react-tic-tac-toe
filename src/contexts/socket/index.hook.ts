import { createContext, useContext } from "react";
import { SocketContextValue } from "./index.types";

export const SocketContext = createContext<SocketContextValue | undefined>(
  undefined
);

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(`"useSocketContext" must be used within "SocketProvider"`);
  }

  return context;
};
