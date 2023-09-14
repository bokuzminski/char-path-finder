export enum Move {
  NONE = "None",
  UP = "Up",
  DOWN = "Down",
  LEFT = "Left",
  RIGHT = "Right",
}
export type MapFormat = string[][];
export type MapFromFile = {
  map: MapFormat;
  startingRow: number;
  startingColumn: number;
};
export type MoveDirection = [number, number];

export type TraveledPathResult = {
  collectedLetters: string;
  pathTraversed: string;
};
export type CollectedCharacter = {
  character: string;
  characterRowLocation: number;
  characterColumnLocation: number;
};
export type CollectedCharactersList = CollectedCharacter[];
export type CurrentPathItem = {
  move: Move;
  currentRowIndex: number;
  currentColumnIndex: number;
};
export const MOVES_BASED_ON_DIRECTION: Record<Move, MoveDirection> = {
  [Move.NONE]: [0, 0],
  [Move.RIGHT]: [0, 1],
  [Move.LEFT]: [0, -1],
  [Move.UP]: [-1, 0],
  [Move.DOWN]: [1, 0],
};
