import { useState } from "react";

import getRandomTurn from "@/helpers/getRandomTurn";
import Marks from "@/components/Marks";

import Game from "../Game";
import * as css from "./View.styles";
import getTileType from "@/helpers/getTileType";

const App = () => {
  const [turn, setTurn] = useState(getRandomTurn());

  const handleChangeTurn = (value: number) => {
    setTurn(value);
  };

  return (
    <div className={css.container}>
      <div className={css.playerBadges}>
        {Boolean(turn) && <Marks type={getTileType(turn)} />}
        <Marks grayscale type="o" />
        <Marks grayscale type="x" />
      </div>
      <Game turn={turn} onChangeTurn={handleChangeTurn} />
    </div>
  );
};

export default App;
