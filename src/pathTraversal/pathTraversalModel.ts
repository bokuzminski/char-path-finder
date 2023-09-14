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
