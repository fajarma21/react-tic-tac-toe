import getTileType from "@/helpers/getTileType";
import * as css from "./View.styles";
import { HistoryProps } from "./View.types";

const History = ({ historyList, isFinished, turn }: HistoryProps) => {
  const player = getTileType(turn);

  return (
    <div className={css.history}>
      {historyList.length ? (
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
      ) : (
        "Let's play!"
      )}
    </div>
  );
};

export default History;
