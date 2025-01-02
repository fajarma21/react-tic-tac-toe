import { css, keyframes } from "@emotion/css";

const timingFunction = "cubic-bezier(0, 0, 0, 1.5)";
const width = `var(--width, 8px)`;

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
    transform: scaleY(0) rotate(0);;
  }
  to {
    transform: scaleY(1) rotate(45deg);;
  }
`;

const xAfterShow = keyframes`
  from {
    transform: scaleY(0) rotate(0);;
  }
  to {
    transform: scaleY(1) rotate(-45deg);;
  }
`;

const mark = css`
  position: absolute;
  z-index: 1;
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
    width: ${width};
    border-radius: 4px;
    background-color: var(--color, crimson);
  }

  &::before {
    animation: ${xBeforeShow} 250ms ${timingFunction} forwards;
  }

  &::after {
    animation: ${xAfterShow} 250ms ${timingFunction} forwards;
  }
`;

export const oMark = css`
  ${mark};
  &::before {
    content: "";
    width: 60%;
    height: 60%;
    border-radius: 50%;
    border: ${width} solid var(--color, mediumseagreen);
    animation: ${circleShow} 250ms ${timingFunction} 1 forwards;
  }
`;
