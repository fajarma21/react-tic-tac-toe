import { TileData } from "@/types";

interface Mark {
  id: number;
  mark: number;
}

export interface RoomReadyValue {
  firstTurn: number;
  marks: Mark[];
}

export interface RoomWinValue {
  resultLine: TileData[];
}
