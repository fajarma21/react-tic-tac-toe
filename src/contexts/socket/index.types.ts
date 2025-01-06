import type { ReactNode } from "react";
import { handleSendToWSParams } from "@/types";

export interface SocketProviderProps {
  children: ReactNode;
  onSendToWS: (args: handleSendToWSParams) => void;
}

export interface SocketContextValue {
  handleSendToWS: SocketProviderProps["onSendToWS"];
}
