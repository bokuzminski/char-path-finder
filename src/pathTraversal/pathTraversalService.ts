import { MOVES_BASED_ON_DIRECTION } from "../constants";
import { CurrentPathItem, MapFormat, Move, MoveDirection } from "./pathTraversalModel";

export function whereToGoFromCorner(map: MapFormat, pathItem: CurrentPathItem): Move {
  const oppositeDirectionsFromThePath =
    pathItem.move === Move.LEFT || pathItem.move === Move.RIGHT ? [Move.UP, Move.DOWN] : [Move.RIGHT, Move.LEFT];

  const availableDirectionsForThisCorner = oppositeDirectionsFromThePath.filter((move) =>
    checkIfNextStepExists(map, { ...pathItem, move })
  );
  const turnIsFake = availableDirectionsForThisCorner.length === 0;
  if (turnIsFake) {
    throw new Error("Fake turn");
  }
  if (availableDirectionsForThisCorner.length > 1) {
    throw new Error("Fork in the path");
  }

  return availableDirectionsForThisCorner[0];
}

export function checkIfNextStepExists(map: MapFormat, nextStep: CurrentPathItem) {
  const moveValue = MOVES_BASED_ON_DIRECTION[nextStep.move];
  const rowIsOutOfBounds = !map[moveValue[0] + nextStep.currentRowIndex];
  if (rowIsOutOfBounds) {
    return false;
  }

  const columnIsOutOfBounds = !map[moveValue[0] + nextStep.currentRowIndex][nextStep.currentColumnIndex + moveValue[1]];
  const positionIsEmpty =
    map[moveValue[0] + nextStep.currentRowIndex][nextStep.currentColumnIndex + moveValue[1]] === " ";

  if (columnIsOutOfBounds || positionIsEmpty) {
    return false;
  }

  return true;
}

export function findMovesNearTheCharacter(map: MapFormat, row: number, column: number): CurrentPathItem[] {
  const possiblePositionsFound: CurrentPathItem[] = [];

  for (const [rowValue, columnValue] of Object.values(MOVES_BASED_ON_DIRECTION)) {
    const skipIterationOfNoneValue = rowValue === 0 && columnValue === 0;
    if (skipIterationOfNoneValue) continue;

    const newRowValue = rowValue + row;
    const newColumnValue = columnValue + column;

    const rowIsWithinBounds = map[newRowValue];
    const itemExists = rowIsWithinBounds && map[newRowValue][newColumnValue];
    if (itemExists && itemExists !== " ") {
      possiblePositionsFound.push({
        move: calculateTheMoveBasedOnIndexes([rowValue, columnValue]),
        currentRowIndex: newRowValue,
        currentColumnIndex: newColumnValue,
      });
    }
  }

  return possiblePositionsFound;
}

export function characterIsLetterWeHaveToCollect(character: string) {
  return character.length === 1 && /[A-Z]/.test(character);
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
