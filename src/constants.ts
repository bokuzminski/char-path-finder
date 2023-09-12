import { Move, MoveDirection } from "./pathTraversal/pathTraversalModel";

export const STARTING_CHARACTER = "@";
export const ENDING_CHARACTER = "x";
export const UP_DOWN_CHARACTER = "|";
export const LEFT_RIGHT_CHARACTER = "-";
export const CORNER_CHARACTER = "+";

export const MOVES_BASED_ON_DIRECTION: Record<Move, MoveDirection> = {
  [Move.NONE]: [0, 0],
  [Move.RIGHT]: [0, 1],
  [Move.LEFT]: [0, -1],
  [Move.UP]: [-1, 0],
  [Move.DOWN]: [1, 0],
};
