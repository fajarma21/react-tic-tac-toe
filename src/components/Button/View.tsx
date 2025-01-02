import { cx } from "@emotion/css";
import * as css from "./View.styles";
import { ButtonProps } from "./View.types";

const Button = ({
  children,
  className,
  disabled,
  color,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      type="button"
      disabled={disabled}
      className={cx(css.btn, className)}
      data-color={color}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
