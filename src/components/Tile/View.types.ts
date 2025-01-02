export interface TileProps {
  isBright: boolean;
  isDisabled: boolean;
  isLast: boolean;
  player?: number;
  type?: number;
  onClick: () => void;
}
