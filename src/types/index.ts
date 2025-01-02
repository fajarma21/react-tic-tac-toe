export interface TileCoordinate {
  x: number;
  y: number;
}

export interface TileData extends TileCoordinate {
  type: number;
}

export interface handleSendToWSParams {
  type: number;
  value?: Record<string, unknown>;
}

export interface GetWSMessageParams {
  type: number;
  room: number;
  roomStatus: number;
  user: number;
  value: string;
}

export interface RoomData {
  id: number;
  user: number[];
}

export interface SocketConstructor {
  url: string;
  onOpen: () => void;
  onClose: (value: string) => void;
  onGetMessage: (params: GetWSMessageParams) => void;
}

interface SendMessageParams {
  type: number;
  user: number;
  value: string;
}

export interface TTTWebSocket extends SocketConstructor {
  sendMessage: (args: SendMessageParams) => void;
  close: (args?: number) => void;
  init: () => void;
}
