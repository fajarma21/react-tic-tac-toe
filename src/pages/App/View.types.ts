import { TileData } from '@/types';

export interface RoomWaitValue {
  winnerId?: number;
}

export interface RoomReadyValue {
  firstTurn: number;
  marks: Array<{
    id: number;
    mark: number;
  }>;
}

export interface RoomWinValue {
  resultLine: TileData[];
  winnerId: number;
}
