import { grayBorder } from "@/constants/styles";
import { css } from "@emotion/css";

export const inputModifier = css`
  all: unset;
  text-align: left;
  width: 100%;

  ::-webkit-search-cancel-button {
    appearance: none;
    height: 10px;
    width: 10px;
    margin: 0px;
    background: linear-gradient(
      transparent 40%,
      #4b4b4b 40%,
      #4b4b4b 60%,
      transparent 60%
    );
  }
`;

export const roomList = css`
  overflow: auto;
  scrollbar-gutter: stable;
  height: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${grayBorder};
  border-width: 1px 0;
`;

export const btnContainer = css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
