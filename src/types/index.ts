export interface TileCoordinate {
  x: number;
  y: number;
}

export interface TileData extends TileCoordinate {
  type: number;
}
