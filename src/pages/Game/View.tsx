import getTileType from "@/helpers/getTileType";
import Marks from "@/components/Marks";
import Template from "@/components/Template";
import Tile from "@/components/Tile";
import { useMainContext } from "@/contexts/main/index.hook";
import { useSocketContext } from "@/contexts/socket/index.hook";
import {
  GAME_MARKING,
  GAME_NEXT_TURN,
  GAME_READY,
  GAME_REMATCH,
  GAME_WIN,
  STATUS_FINISH,
  STATUS_FINISH_BREAK,
} from "@/constants";

import { checkLine } from "./View.helpers";
import { MAX_ALL_MARK, TILES } from "./View.constants";
import * as css from "./View.styles";
import Overlay from "./components/Overlay";
import { GameProps } from "./View.types";
import { TileCoordinate } from "@/types";

const Game = ({ statusText }: GameProps) => {
  const { handleSendToWS } = useSocketContext();
  const { gameStatus, historyList, line, mark, turn, roomId } =
    useMainContext();

  const isBegin = Boolean(turn);
  const isFinished = gameStatus === STATUS_FINISH;
  const isFinishedBreak = gameStatus === STATUS_FINISH_BREAK;
  const player = getTileType(mark);
  const currentTurn = getTileType(turn);
  const isPlayerTurn = player === currentTurn;

  const showedHistory =
    historyList.length > MAX_ALL_MARK
      ? historyList.slice(0, MAX_ALL_MARK)
      : historyList;

  const handleClick = (value: TileCoordinate) => {
    const { x, y } = value;
    if (
      !showedHistory.find((item) => item.x === x && item.y === y) &&
      isBegin &&
      isPlayerTurn
    ) {
      const completeValue = { ...value, type: turn };
      handleSendToWS({
        type: GAME_MARKING,
        value: { ...completeValue, roomId },
      });

      const resultLine = checkLine({
        historyList: showedHistory,
        data: { ...value, type: turn },
      });

      if (resultLine.length) {
        handleSendToWS({ type: GAME_WIN, value: { roomId, resultLine } });
      } else handleSendToWS({ type: GAME_NEXT_TURN, value: { roomId } });
    }
  };

  const handleStart = () => {
    handleSendToWS({ type: GAME_READY, value: { roomId } });
  };

  const handleFindMatch = () => {
    handleSendToWS({ type: GAME_REMATCH, value: { roomId } });
  };

  return (
    <Template>
      <>
        <div>
          <b>Room</b> {roomId}
        </div>
        {isBegin && (
          <div className={css.rowCenter}>
            <b>Turn</b>
            <div className={css.playerBadge}>
              <Marks type={currentTurn} />
            </div>
          </div>
        )}
      </>
      <>
        <div className={css.grid}>
          {[...Array(TILES)].map((_, row) => (
            <div className={css.row} key={`row-${row}`}>
              {[...Array(TILES)].map((_, col) => {
                const { type } =
                  showedHistory.find(
                    (item) => item.x === col && item.y === row
                  ) || {};
                const oldTile = showedHistory[showedHistory.length - 1];
                const isLast =
                  !isFinished &&
                  showedHistory.length >= MAX_ALL_MARK &&
                  oldTile.x === col &&
                  oldTile.y === row;
                return (
                  <Tile
                    key={`tile-${row}${col}`}
                    isBright={line.some(
                      (item) => item.x === col && item.y === row
                    )}
                    isDisabled={!isPlayerTurn || isFinished}
                    isLast={isLast}
                    player={mark}
                    type={type}
                    onClick={() => handleClick({ x: col, y: row })}
                  />
                );
              })}
            </div>
          ))}
        </div>
        {isBegin && (
          <>
            <div className={css.verticalLine} />
            <div className={css.horizontalLine} />
          </>
        )}
        <Overlay
          isPlayerTurn={isPlayerTurn}
          gameStatus={gameStatus}
          onClickFindMatch={handleFindMatch}
          onClickStart={handleStart}
        />
      </>
      <div className={css.history}>
        {statusText && isFinishedBreak && (
          <p className={css.statusText}>{statusText}</p>
        )}
        {Boolean(historyList.length) && (
          <ul>
            {isFinished && (
              <li>{`${currentTurn} win in ${historyList.length} turns`}</li>
            )}
            {historyList.map((item, index) => {
              const turnItem = getTileType(item.type);
              return (
                <li key={`history-${index}`}>
                  {turnItem} turn: ({item.x}, {item.y})
                </li>
              );
            })}
          </ul>
        )}
        {statusText && !isFinishedBreak && (
          <p className={css.statusText}>{statusText}</p>
        )}
      </div>
    </Template>
  );
};

export default Game;
