import * as css from "./View.styles";
import type { MarksProps } from "./View.types";

const Marks = ({ type }: MarksProps) => {
  return <div className={css[`${type}Mark`]} />;
};

export default Marks;
