import { useState } from "react";

import Tile from "@/components/Tile";
import { checkLine, randomFirstTurn } from "./View.helpers";
import { MAX_ALL_MARK, TILES } from "./View.constants";
import * as css from "./View.styles";
import { TileCoordinate, TileData } from "./View.types";
import { getTileType } from "@/helpers";

function App() {
  const [firstTurn, setFirstTurn] = useState(randomFirstTurn());
  const [turn, setTurn] = useState(firstTurn);
  const [historyList, setHistoryList] = useState<TileData[]>([]);
  const [line, setLine] = useState<TileData[]>([]);

  const player = getTileType(turn);
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
      } else setTurn((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    const firstTurn = randomFirstTurn();
    setFirstTurn(firstTurn);
    setTurn(firstTurn);
    setHistoryList([]);
    setLine([]);
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Tic-Tac-Toe</h1>
      <div className={css.turnContainer}>
        {player} {isFinished ? "win" : "turn"}
      </div>
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
                  type={type}
                  onClick={() => handleClick({ x: col, y: row })}
                />
              );
            })}
          </div>
        ))}
      </div>
      <button
        type="button"
        disabled={!isFinished}
        className={css.btn}
        onClick={handleReset}
      >
        Reset
      </button>
      <div className={css.historyContainer}>
        <h3>History</h3>
        <div className={css.history}>
          {historyList.length ? (
            <ul>
              {historyList.map((item, index) => {
                const turnItem = getTileType(item.type);
                return (
                  <li key={`history-${index}`}>
                    {turnItem} turn: ({item.x}, {item.y})
                    {index === 0 &&
                      isFinished &&
                      ` - ${turnItem} win in ${historyList.length} turns`}
                  </li>
                );
              })}
            </ul>
          ) : (
            "No history"
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
