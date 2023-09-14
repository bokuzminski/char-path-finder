import { Move, MoveDirection } from "./pathTraversal/pathTraversalModel";

export function characterIsLetterWeHaveToCollect(character: string) {
  return character.length === 1 && character.match(/[A-Z]/);
}

export function calculateTheMoveBasedOnIndexes(moveDirection: MoveDirection): Exclude<Move, Move.NONE> {
  const [row, column] = moveDirection;

  if (row === 0) {
    if (column === 1) return Move.RIGHT;
    if (column === -1) return Move.LEFT;
  }
  if (column === 0) {
    if (row === 1) return Move.DOWN;
    if (row === -1) return Move.UP;
  }

  throw new Error("Tuple containing the move is wrong");
}
