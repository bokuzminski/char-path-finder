import { Move, MoveDirection } from "./pathTraversal/pathTraversalModel";

export function characterIsLetterWeHaveToCollect(character: string) {
  return character.length === 1 && character.match(/[A-Z]/);
}

export function calculateTheMoveBasedOnIndexes(move: MoveDirection): Exclude<Move, Move.NONE> {
  const [row, column] = move;

  if (row === 0) {
    return column === 1 ? Move.RIGHT : Move.LEFT;
  }
  if (column === 0) {
    return row === 1 ? Move.DOWN : Move.UP;
  }

  throw new Error("Tuple containing the move is wrong");
}
