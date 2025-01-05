import { grayBorder } from "@/constants/styles";
import { css } from "@emotion/css";

export const btn = css`
  all: unset;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  flex: none;
  min-width: 100px;
  height: 50px;
  padding: 0 12px;
  background-color: white;
  border-width: 1px 1px 6px;
  border-style: solid;
  border-color: #6c6c6c;
  border-radius: 8px;
  transition: all 250ms;

  &[data-color="orange"] {
    color: white;
    background-color: #ff9f0e;
    border-color: #d65000;
  }

  &:disabled {
    cursor: not-allowed;
    color: gray;
    background-color: ${grayBorder};
    border-color: gray;
  }
`;
