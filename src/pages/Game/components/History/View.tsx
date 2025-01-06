import { useMainContext } from "@/contexts/main/index.hook";
import { STATUS_FINISH, STATUS_FINISH_BREAK } from "@/constants";
import getTileType from "@/helpers/getTileType";

import * as css from "./View.styles";

const History = () => {
  const { gameStatus, historyList, statusText, turn } = useMainContext();

  const player = getTileType(turn);
  const isFinished = gameStatus === STATUS_FINISH;
  const isFinishedBreak = gameStatus === STATUS_FINISH_BREAK;

  return (
    <div className={css.history}>
      {statusText && isFinishedBreak && (
        <p className={css.statusText}>{statusText}</p>
      )}
      {Boolean(historyList.length) && (
        <ul>
          {isFinished && (
            <li>{`${player} win in ${historyList.length} turns`}</li>
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
  );
};

export default History;
