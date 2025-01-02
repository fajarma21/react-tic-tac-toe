import { TileData } from "@/types";
import type { ReactNode } from "react";

export interface MainContextValue {
  gameStatus: number;
  historyList: TileData[];
  line: TileData[];
  mark: number;
  roomId: number;
  turn: number;
  userId: number;
}

export interface MainProviderProps extends MainContextValue {
  children: ReactNode;
}
