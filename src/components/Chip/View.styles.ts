import { css } from "@emotion/css";

export const chip = css`
  all: unset;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  padding: 0 12px;
  height: 30px;
  max-width: 100px;
  margin: 0 8px 8px 0;
  background-color: #e7e7e7;
  border-radius: 16px;
  transition: all 250ms;

  &:disabled {
    cursor: not-allowed;
    color: gray;
    background-color: #cdcdcd;
    border-color: gray;
  }
`;
