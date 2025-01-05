import Button from "@/components/Button";
import * as css from "./View.styles";
import { OverlayProps } from "./View.types";

const Overlay = ({ onClickStart }: OverlayProps) => {
  return (
    <div className={css.overlay}>
      <Button color="orange" onClick={onClickStart}>
        Reset
      </Button>
    </div>
  );
};

export default Overlay;
