import { CSSProperties } from "react";
import { getTileType } from "@/helpers";
import Marks from "../Marks";
import * as css from "./View.styles";
import type { TileProps } from "./View.types";

const Tile = ({ isBright, isDisabled, isLast, type, onClick }: TileProps) => {
  return (
    <button
      type="button"
      className={css.tile}
      disabled={isDisabled}
      data-bright={isBright || undefined}
      style={{ "--last": !isLast ? Number(!isLast) : 0.7 } as CSSProperties}
      onClick={onClick}
    >
      {type && <Marks type={getTileType(type)} />}
    </button>
  );
};

export default Tile;
