import { STATUS_ALL_JOIN, STATUS_END, STATUS_WAIT } from "@/constants";

export const TILES = 3;
export const MAX_ALL_MARK = TILES * 2 + 1;

export const SHOW_OVERLAY = [...STATUS_WAIT, STATUS_ALL_JOIN, ...STATUS_END];
