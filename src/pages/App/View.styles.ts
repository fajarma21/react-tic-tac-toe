import { css } from "@emotion/css";
import { grayBorder } from "@/constants/colors";

const transparentBg = css`
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
`;

export const container = css`
  text-align: center;
  width: 348px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #aaaaaa;
  box-shadow: 0px 10px 0 #6c6c6c;
`;

export const title = css`
  margin: 0 0 10px;
  color: #ffff91;
  border-radius: 10px;
`;

export const turnContainer = css`
  ${transparentBg};
  color: #4b4b4b;
  text-align: center;
  margin-bottom: 10px;
`;

export const grid = css`
  overflow: hidden;
  width: 308px;
  height: 308px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid ${grayBorder};
`;

export const row = css`
  display: flex;
`;

export const btn = css`
  all: unset;
  cursor: pointer;
  width: 100%;
  height: 50px;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  border-bottom: 6px solid #d65000;
  border-radius: 8px;
  background-color: #ff9f0e;
  transition: all 250ms;

  &:disabled {
    cursor: not-allowed;
    color: gray;
    background-color: #cdcdcd;
    border-color: gray;
  }
`;

export const historyContainer = css`
  text-align: left;
  margin-top: 10px;
  color: #4b4b4b;

  h3 {
    margin: 0 0 4px;
  }
`;

export const history = css`
  overflow: auto;
  max-height: 100px;
  padding: 8px 12px;
  ${transparentBg};

  ul {
    margin: 0;
    padding-left: 20px;
  }
`;
