import { css } from "@emotion/css";
import { grayBorder } from "@/constants/colors";

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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px;
  color: #4b4b4b;
  text-align: center;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: wheat;
`;

export const playerBadge = css`
  --width: 2px;
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 4px;
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
  color: white;
  font-weight: bold;
  text-align: center;
  flex: none;
  width: 40%;
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
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 8px;
  margin-top: 10px;
`;

export const history = css`
  overflow: auto;
  text-align: left;
  height: 100px;
  width: 100%;
  padding: 8px 12px;
  color: #4b4b4b;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;

  ul {
    margin: 0;
    padding-left: 20px;
  }
`;
