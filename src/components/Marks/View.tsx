import { CSSProperties } from "react";
import * as css from "./View.styles";
import type { MarksProps } from "./View.types";

const Marks = ({ grayscale, type }: MarksProps) => {
  const style = {
    "--color": grayscale ? "#e4e4e4" : undefined,
    zIndex: Number(!grayscale),
  } as CSSProperties;

  return <div className={css[`${type}Mark`]} style={style} />;
};

export default Marks;
