import { useState } from "react";

import getRandomTurn from "@/helpers/getRandomTurn";
import Template from "@/components/Template";
import Tile from "@/components/Tile";
import { TileCoordinate, TileData } from "@/types";

import History from "./components/History";
import Overlay from "./components/Overlay";
import { checkLine } from "./View.helpers";
import { MAX_ALL_MARK, TILES } from "./View.constants";
import * as css from "./View.styles";
import { GameProps } from "./View.types";

const Game = ({ turn, onChangeTurn }: GameProps) => {
  const [historyList, setHistoryList] = useState<TileData[]>([]);
  const [line, setLine] = useState<TileData[]>([]);

  const isFinished = line.length === 3;

  const showedHistory =
    historyList.length > MAX_ALL_MARK
      ? historyList.slice(0, MAX_ALL_MARK)
      : historyList;

  const handleClick = (value: TileCoordinate) => {
    const { x, y } = value;
    if (!showedHistory.find((item) => item.x === x && item.y === y)) {
      setHistoryList((prev) => [{ x, y, type: turn }, ...prev]);

      const resultLine = checkLine({
        historyList: showedHistory,
        data: { ...value, type: turn },
      });

      if (resultLine.length) {
        setLine(resultLine);
      } else onChangeTurn(turn + 1);
    }
  };

  const handleReset = () => {
    onChangeTurn(getRandomTurn());
    setHistoryList([]);
    setLine([]);
  };

  return (
    <Template>
      <div className={css.rowCenter}>Good luck, have fun!</div>
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
                    isDisabled={isFinished}
                    isLast={isLast}
                    player={turn}
                    type={type}
                    onClick={() => handleClick({ x: col, y: row })}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className={css.verticalLine} />
        <div className={css.horizontalLine} />
        {isFinished && <Overlay onClickStart={handleReset} />}
      </>
      <History historyList={historyList} isFinished={isFinished} turn={turn} />
    </Template>
  );
};

export default Game;
