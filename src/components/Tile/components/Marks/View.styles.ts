import { css, keyframes } from "@emotion/css";

const timingFunction = "cubic-bezier(0, 0, 0, 1.5)";

const circleShow = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

const xBeforeShow = keyframes`
  from {
    transform: scale(0) rotate(0);;
  }
  to {
    transform: scale(1) rotate(45deg);;
  }
`;

const xAfterShow = keyframes`
  from {
    transform: scale(0) rotate(0);;
  }
  to {
    transform: scale(1) rotate(-45deg);;
  }
`;

const mark = css`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: var(--last);
  transform: scale(var(--last));
  will-change: opacity, transform;
  transition: all 250ms ${timingFunction};
`;

export const xMark = css`
  ${mark};

  &::before,
  &::after {
    content: "";
    position: absolute;
    display: block;
    height: 90%;
    width: 8px;
    border-radius: 4px;
    background-color: crimson;
  }

  &::before {
    animation: ${xBeforeShow} 250ms ${timingFunction} 1 forwards;
  }

  &::after {
    animation: ${xAfterShow} 250ms ${timingFunction} 1 forwards;
  }
`;

export const oMark = css`
  ${mark};
  &::before {
    content: "";
    width: 60%;
    height: 60%;
    border-radius: 50%;
    border: 8px solid mediumseagreen;
    animation: ${circleShow} 250ms ${timingFunction} 1 forwards;
  }
`;
