import { CurrentPathItem, MOVES_BASED_ON_DIRECTION, MapFormat, Move, MoveDirection } from "./pathTraversalModel";

export function getNextItemInPath(map: MapFormat, nextPathDirection: CurrentPathItem): CurrentPathItem {
  const [rowMove, columnMove] = MOVES_BASED_ON_DIRECTION[nextPathDirection.move];
  const moveIsPossibleAndExists = checkIfNextMoveExists(map, nextPathDirection);
  if (!moveIsPossibleAndExists) {
    throw new Error("No possible moves available, broken path");
  }

  const nextRowIndex = rowMove + nextPathDirection.currentRowIndex;
  const nextColumnIndex = columnMove + nextPathDirection.currentColumnIndex;

  return { move: nextPathDirection.move, currentRowIndex: nextRowIndex, currentColumnIndex: nextColumnIndex };
}

export function findMoveAfterCorner(map: MapFormat, pathItem: CurrentPathItem): Move {
  const oppositeDirectionsFromThePath =
    pathItem.move === Move.LEFT || pathItem.move === Move.RIGHT ? [Move.UP, Move.DOWN] : [Move.RIGHT, Move.LEFT];

  const availableDirectionsForThisCorner = oppositeDirectionsFromThePath.filter((move) =>
    checkIfNextMoveExists(map, { ...pathItem, move })
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

export function checkIfNextMoveExists(map: MapFormat, { move, currentRowIndex, currentColumnIndex }: CurrentPathItem) {
  const [rowMove, columnMove] = MOVES_BASED_ON_DIRECTION[move];
  const rowIsOutOfBounds = !map[rowMove + currentRowIndex];
  if (rowIsOutOfBounds) {
    return false;
  }

  const columnIsOutOfBounds = !map[rowMove + currentRowIndex][currentColumnIndex + columnMove];
  const foundPathItem = map[rowMove + currentRowIndex][currentColumnIndex + columnMove];
  const positionIsEmpty = foundPathItem === " ";

  if (columnIsOutOfBounds || positionIsEmpty) {
    return false;
  }

  return true;
}

export function findFirstMoveFromStartingSymbol(map: MapFormat, row: number, column: number): CurrentPathItem[] {
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
