export interface TileCoordinate {
  x: number;
  y: number;
}

export interface TileData extends TileCoordinate {
  type: number;
}

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
