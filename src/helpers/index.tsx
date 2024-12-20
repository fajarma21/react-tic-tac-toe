export const getTileType = (turn: number) => {
  return turn % 2 ? "x" : "o";
};
