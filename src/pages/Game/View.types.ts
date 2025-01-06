import { TileData } from "@/types";

export interface CheckLineParams {
  historyList: TileData[];
  data: TileData;
}

export interface TileNeighborData extends TileData {
  lineType: number;
}

export interface GetNeighborsParams {
  checkList: TileData[];
  current: TileData;
  lineType?: number;
}
