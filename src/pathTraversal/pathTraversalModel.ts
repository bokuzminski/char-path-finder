export enum Move {
  NONE = -1,
  UP,
  DOWN,
  LEFT,
  RIGHT,
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
export type CollectedCharactersList = { character: string; X: number; Y: number }[];
export type Path = {
  move: Move;
  X: number;
  Y: number;
};

export function calculateTheMoveBasedOnIndexes(move: MoveDirection) {
  const [row, column] = move;

  if (row === 0) {
    return column === 1 ? Move.RIGHT : Move.LEFT;
  }
  if (column === 0) {
    return row === 1 ? Move.DOWN : Move.UP;
  }

  throw new Error("Tuple containing the move is wrong");
}
