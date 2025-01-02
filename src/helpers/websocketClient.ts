import { GetWSMessageParams, SocketConstructor } from "@/types";
import JsonParse from "./JsonParse";

class WebsocketClient {
  client: WebSocket | null;
  url: string;
  onOpen: () => void;
  onClose: (value: string) => void;
  onGetMessage: (params: GetWSMessageParams) => void;

  constructor({ url, onOpen, onClose, onGetMessage }: SocketConstructor) {
    this.client = null;
    this.url = url;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onGetMessage = onGetMessage;
    this.init();
  }

  init = () => {
    if (!this.client) {
      const ws = new WebSocket(this.url);

      ws.onopen = () => {
        this.onOpen();
      };

      ws.onmessage = (params) => {
        this.onGetMessage(JsonParse(params.data));
      };

      ws.onerror = () => {
        this.onClose("error");
      };

      ws.onclose = () => {
        this.onClose("close");
        this.client = null;
      };

      this.client = ws;
    }

    return this.client;
  };

  sendMessage = (data: { type: number; value: string }) => {
    if (this.client) this.client.send(JSON.stringify(data));
  };

  close = () => {
    if (this.client) this.client.close();
  };
}

export default WebsocketClient;
