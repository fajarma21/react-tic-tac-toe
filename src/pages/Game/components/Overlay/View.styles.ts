import { css, keyframes } from "@emotion/css";

const glass = "#ababab";
const sand = "#ffc18d";

const timeBefore = keyframes`
  0%, 30% {
    transform: rotateZ(0);
  }

  49.9% {
    transform: rotateZ(180deg);
  }
  50%, 80% {
    transform: rotateZ(0);
  }
  
  99.9% {
    transform: rotateZ(180deg);
  }
  100% {
    transform: rotateZ(0);
  }
`;

const timeAfter = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(0);
  }

  49.9% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  80% {
    transform: scale(0);
  }

  99.9% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

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

export const hour = css`
  position: relative;
  width: 50px;
  height: 50px;
  margin: 0 auto;

  &::before,
  &::after {
    content: "";
    position: absolute;
    display: block;
    box-sizing: border-box;
    height: 50px;
    width: 50px;
    border-style: solid;
    border-width: 25px 23px;
    border-radius: 50%;
  }

  &::before {
    border-color: ${glass} transparent ${sand};
    animation: ${timeBefore} ease 5s infinite;
  }
  &::after {
    border-color: ${sand} transparent ${glass};
    animation: ${timeAfter} ease 5s infinite;
  }
`;

export const statusResult = css`
  font-size: 3rem;
  margin: 0 0 8px;
`;
