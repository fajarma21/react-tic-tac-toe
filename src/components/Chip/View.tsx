import { cx } from "@emotion/css";
import * as css from "./View.styles";
import { ChipProps } from "./View.types";

const Chip = ({
  children,
  className,
  disabled,
  onClick,
  ...rest
}: ChipProps) => {
  return (
    <button
      {...rest}
      type="button"
      disabled={disabled}
      className={cx(css.chip, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Chip;
