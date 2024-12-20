import { css } from "@emotion/css";
import { grayBorder } from "@/constants/colors";

export const tile = css`
  all: unset;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid ${grayBorder};
  &:focus-visible {
    outline: 2px solid aqua;
  }

  &:hover {
    background-color: #e9e9e9;
  }

  &[data-bright] {
    background-color: #ffff41;
    &:hover {
      background-color: #ffff41;
    }
  }
`;
