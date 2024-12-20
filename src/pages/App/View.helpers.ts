import { TILES } from "./View.constants";
import {
  CheckLineParams,
  GetNeighborsParams,
  TileData,
  TileNeighborData,
} from "./View.types";

export const randomFirstTurn = () => Math.ceil(Math.random() * 2);

const getTurnType = (turn: number) => {
  return turn % 2;
};

const getNeighbors = ({ checkList, current, lineType }: GetNeighborsParams) => {
  const neighbors: TileNeighborData[] = [];

  const currX = current.x;
  const currY = current.y;

  const newList = checkList.filter(
    (item) => !(item.x === currX && item.y === currY)
  );

  for (const item of newList) {
    const top = currY - 1;
    const right = currX + 1;
    const bottom = currY + 1;
    const left = currX - 1;
    const hasTop = top >= 0;
    const hasRight = right <= TILES - 1;
    const hasBottom = bottom <= TILES - 1;
    const hasLeft = left >= 0;
    const hasTopRight = hasTop && hasRight;
    const hasBottomRight = hasBottom && hasRight;
    const hasBottomLeft = hasBottom && hasLeft;
    const hasTopLeft = hasTop && hasLeft;

    const isTop = hasTop && item.x === currX && item.y === top;
    const isTopRight = hasTopRight && item.x === right && item.y === top;
    const isRight = hasRight && item.x === right && item.y === currY;
    const isBottomRight =
      hasBottomRight && item.x === right && item.y === bottom;
    const isBottom = hasBottom && item.x === currX && item.y === bottom;
    const isBottomLeft = hasBottomLeft && item.x === left && item.y === bottom;
    const isLeft = hasLeft && item.x === left && item.y === currY;
    const isTopLeft = hasTopLeft && item.x === left && item.y === top;

    if (lineType) {
      if (
        (lineType === 1 && (isTop || isBottom)) ||
        (lineType === 2 && (isRight || isLeft)) ||
        (lineType === 3 && (isTopLeft || isBottomRight)) ||
        (lineType === 4 && (isTopRight || isBottomLeft))
      ) {
        neighbors.push({ ...item, lineType });
      }
    } else if (
      isTop ||
      isTopRight ||
      isRight ||
      isBottomRight ||
      isBottom ||
      isBottomLeft ||
      isBottom ||
      isLeft ||
      isTopLeft
    ) {
      console.log("here");
      let newLineType = 0;
      if (isTop || isBottom) newLineType = 1;
      else if (isLeft || isRight) newLineType = 2;
      else if (isTopLeft || isBottomRight) newLineType = 3;
      else newLineType = 4;

      neighbors.push({ ...item, lineType: newLineType });
    }
  }

  return neighbors;
};

export const checkLine = ({ historyList, data }: CheckLineParams) => {
  let tempLine: TileData[] = [data];

  const checkHistory = historyList.filter(
    (item) => getTurnType(item.type) === getTurnType(data.type)
  );

  if (checkHistory.length >= 2) {
    const neighbors = getNeighbors({ checkList: checkHistory, current: data });

    const sortedNeighbors = neighbors.sort((a, b) => a.lineType - b.lineType);
    const sameNeighbors = sortedNeighbors.reduce(
      (prev: TileNeighborData[], current: TileNeighborData) => {
        if (prev.length) {
          if (prev.find((item) => item.lineType === current.lineType)) {
            return [...prev, current];
          }
          if (prev.length > 1) return prev;
        }
        return [current];
      },
      []
    );

    if (sameNeighbors.length === 2) tempLine = [...tempLine, ...sameNeighbors];
    else {
      for (const item of neighbors) {
        const otherNeighbors = getNeighbors({
          checkList: checkHistory,
          current: item,
          lineType: item.lineType,
        });
        if (otherNeighbors.length) {
          tempLine = [...tempLine, item, ...otherNeighbors];
          break;
        }
      }
    }
  }

  return tempLine.length === 3 ? tempLine : [];
};
