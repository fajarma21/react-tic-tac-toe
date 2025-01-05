import { CSSProperties } from "react";
import getTileType from "@/helpers/getTileType";
import Marks from "../Marks";
import * as css from "./View.styles";
import type { TileProps } from "./View.types";

const Tile = ({
  isBright,
  isDisabled,
  isLast,
  player,
  type,
  onClick,
}: TileProps) => {
  return (
    <button
      type="button"
      className={css.tile}
      disabled={isDisabled}
      data-bright={isBright || undefined}
      data-contain={type || undefined}
      style={{ "--last": !isLast ? Number(!isLast) : 0.7 } as CSSProperties}
      onClick={onClick}
    >
      {type ? <Marks type={getTileType(type)} /> : null}
      {!type && player ? <Marks grayscale type={getTileType(player)} /> : null}
    </button>
  );
};

export default Tile;
