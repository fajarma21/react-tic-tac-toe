import { useCallback, useEffect, useRef, useState } from "react";

import Marks from "@/components/Marks";
import {
  GAME_CLOSE,
  GAME_CREATE_ROOM,
  GAME_INIT,
  GAME_JOIN_ROOM,
  GAME_MARKING,
  GAME_NEXT_TURN,
  GAME_READY,
  GAME_WIN,
  STATUS_ALL_JOIN,
  STATUS_ALL_READY,
  STATUS_BREAK,
  STATUS_WAIT_JOIN,
  STATUS_WAIT_READY,
} from "@/constants";
import SocketProvider from "@/contexts/socket";
import MainProvider from "@/contexts/main";
import getTileType from "@/helpers/getTileType";
import JsonParse from "@/helpers/JsonParse";
import WebsocketClient from "@/helpers/websocketClient";
import {
  handleSendToWSParams,
  GetWSMessageParams,
  RoomData,
  TileData,
  TTTWebSocket,
} from "@/types";

import Game from "../Game";
import Home from "../Home";
import * as css from "./View.styles";
import { RoomReadyValue, RoomWinValue } from "./View.types";
import checkEnv from "@/helpers/checkEnv";

const App = () => {
  const wsClient = useRef<TTTWebSocket | null>(null);
  const userId = useRef(0);
  const roomId = useRef(0);

  const [roomList, setRoomList] = useState<RoomData[]>([]);

  const [gameStatus, setGameStatus] = useState(0);
  const [turn, setTurn] = useState(0);
  const [mark, setMark] = useState(0);
  const [historyList, setHistoryList] = useState<TileData[]>([]);
  const [line, setLine] = useState<TileData[]>([]);
  const [statusText, setStatusText] = useState("");

  const resetGame = () => {
    if (setHistoryList.length) {
      setMark(0);
      setTurn(0);
      setHistoryList([]);
      setLine([]);
    }
  };

  const handleGetMessage = useCallback(
    ({ type, room, roomStatus, user, value }: GetWSMessageParams) => {
      switch (type) {
        case GAME_INIT:
          userId.current = user;
          break;
        case GAME_CREATE_ROOM:
          if (user === userId.current) {
            if (!roomId.current) {
              roomId.current = room;
            }

            resetGame();

            setStatusText("Waiting for opponent to join...");
            setGameStatus(STATUS_WAIT_JOIN);
          }
          break;
        case GAME_JOIN_ROOM:
          if (user === userId.current) {
            roomId.current = room;
            setStatusText("The opponent has been waiting for you");
          }
          if (room === roomId.current) {
            if (user !== userId.current) {
              setStatusText("The opponent has joined the room");
            }
            setGameStatus(STATUS_ALL_JOIN);
          }
          break;
        case GAME_READY:
          if (roomStatus === STATUS_WAIT_READY) {
            if (room === roomId.current) {
              if (user === userId.current) {
                setStatusText("Waiting for opponent to be ready");
                setGameStatus(roomStatus);
              } else {
                setStatusText("The opponent is ready! Hit that button!");
              }

              resetGame();
            }
          }
          if (roomStatus === STATUS_ALL_READY) {
            if (room === roomId.current) {
              resetGame();

              const { firstTurn, marks } = JsonParse<RoomReadyValue>(value);
              const marksData = marks.find(
                (item) => item.id === userId.current
              );
              let playerMark = 0;
              if (marksData) {
                playerMark = marksData.mark;
                setMark(playerMark);
              }

              setTurn(firstTurn);

              const yourTurn =
                getTileType(firstTurn) === getTileType(playerMark);
              setStatusText(
                `${yourTurn ? "You go" : "Hold on! the opponent goes"} first.`
              );
              setGameStatus(roomStatus);
            }
          }
          break;
        case GAME_MARKING:
          if (room === roomId.current) {
            const parsedData = JsonParse<TileData>(value);
            setStatusText("");
            setHistoryList((prev) => [parsedData, ...prev]);
          }
          break;
        case GAME_NEXT_TURN:
          if (room === roomId.current) setTurn((prev) => prev + 1);
          break;
        case GAME_WIN:
          if (room === roomId.current) {
            const { resultLine } = JsonParse<RoomWinValue>(value);
            setGameStatus(roomStatus);
            setLine(resultLine);
          }
          break;
        case GAME_CLOSE:
          if (room === roomId.current) {
            let text = "room";
            if (roomStatus === STATUS_BREAK) text = "match";
            setStatusText(`The Opponent has left the ${text}`);
            setGameStatus(roomStatus);
          }
          break;

        default:
          break;
      }

      setRoomList(JsonParse(value));
    },
    []
  );

  const handleSendToWS = useCallback(
    ({ type, value }: handleSendToWSParams) => {
      if (wsClient.current && userId.current) {
        const stringValue = value ? JSON.stringify(value) : "{}";
        wsClient.current.sendMessage({
          type: type,
          user: userId.current,
          value: stringValue,
        });
      }
    },
    []
  );

  const handleCloseWS = useCallback(() => {
    if (roomId.current)
      handleSendToWS({ type: GAME_CLOSE, value: { roomId: roomId.current } });
  }, [handleSendToWS]);

  useEffect(() => {
    if (!wsClient.current) {
      if (!checkEnv()) return;
      wsClient.current = new WebsocketClient({
        url: import.meta.env.VITE_WS_URL,
        onOpen: () => console.log("open"),
        onClose: () => console.log("close"),
        onGetMessage: handleGetMessage,
      });
    }
  }, [handleGetMessage]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleCloseWS);

    return () => {
      window.removeEventListener("beforeunload", handleCloseWS);
    };
  }, [handleCloseWS]);

  return (
    <div className={css.container}>
      <div className={css.playerBadges}>
        {Boolean(mark) && <Marks type={getTileType(mark)} />}
        <Marks grayscale type="o" />
        <Marks grayscale type="x" />
      </div>

      <MainProvider
        gameStatus={gameStatus}
        historyList={historyList}
        mark={mark}
        line={line}
        roomId={roomId.current}
        statusText={statusText}
        turn={turn}
        userId={userId.current}
      >
        <SocketProvider onSendToWS={handleSendToWS}>
          {roomId.current ? <Game /> : <Home rooms={roomList} />}
        </SocketProvider>
      </MainProvider>
    </div>
  );
};

export default App;
