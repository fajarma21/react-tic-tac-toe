import { css, keyframes } from "@emotion/css";
import { bounce, grayBorder } from "@/constants/styles";

const horizontal = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleY(1);
  }
`;

const vertical = keyframes`
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
`;

export const playerBadge = css`
  --width: 2px;
  position: relative;
  width: 18px;
  height: 18px;
`;

export const gridWrapper = css`
  position: relative;
  height: 301px;
`;

export const grid = css`
  overflow: hidden;
  display: inline-block;
  width: 300px;
  height: 301px;
  border-radius: 10px;
  background-color: white;
`;

export const row = css`
  display: flex;
`;

export const rowCenter = css`
  ${row};
  align-items: center;
  gap: 4px;
`;

const line = css`
  pointer-events: none;
  position: absolute;
  ::after,
  ::before {
    content: "";
    position: absolute;
    display: block;
    background-color: #e4e4e4;
  }
`;

export const verticalLine = css`
  ${line};
  top: 5%;
  left: 100px;
  width: 100px;
  height: 90%;
  animation: ${horizontal} 250ms ${bounce} forwards;
  ::after,
  ::before {
    width: 2px;
    height: 100%;
  }

  ::before {
    left: -1px;
  }
  ::after {
    right: -1px;
  }
`;

export const horizontalLine = css`
  ${line};
  left: 5%;
  top: 100px;
  height: 100px;
  width: 90%;
  animation: ${vertical} 250ms ${bounce} forwards;
  ::after,
  ::before {
    content: "";
    height: 2px;
    width: 100%;
  }

  ::before {
    top: -1px;
  }
  ::after {
    bottom: -1px;
  }
`;

export const history = css`
  overflow: auto;
  text-align: left;
  height: 100%;
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border-top: 1px solid ${grayBorder};

  ul {
    margin: 0;
    padding-left: 20px;
  }
`;
