import { css } from "@emotion/css";

export const overlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 2;
`;
