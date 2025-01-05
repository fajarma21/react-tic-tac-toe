import { css } from "@emotion/css";

export const tile = css`
  all: unset;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  &:focus-visible {
    outline: inset 2px solid aqua;
  }

  &:not([data-contain]) > :first-child {
    opacity: 0;
  }

  &:not(:disabled):not([data-contain]):hover > :first-child {
    opacity: 1;
  }

  &[data-bright] {
    background-color: #ffff41;
    &:hover {
      background-color: #ffff41;
    }
  }
`;
