import {
  CORNER_CHARACTER,
  ENDING_CHARACTER,
  LEFT_RIGHT_CHARACTER,
  MOVES_BASED_ON_DIRECTION,
  STARTING_CHARACTER,
  UP_DOWN_CHARACTER,
} from "../constants";
import { characterIsLetterWeHaveToCollect } from "../helpers";
import {
  CollectedCharactersList,
  MapFormat,
  MapFromFile,
  Move,
  Path,
  TraveledPathResult,
  calculateTheMoveBasedOnIndexes,
} from "./pathTraversalModel";

export function followThePath({ map, startingRow, startingColumn }: MapFromFile): TraveledPathResult {
  let endReached = false;
  let nextPathDirection: Path = { move: Move.NONE, X: startingRow, Y: startingColumn };
  let pathCompleted: string[] = [];
  const fullCharacterPath: CollectedCharactersList = [];

  while (!endReached) {
    const currentCharacterWeAreOn = map[nextPathDirection.X][nextPathDirection.Y];
    pathCompleted.push(currentCharacterWeAreOn);

    if (currentCharacterWeAreOn === STARTING_CHARACTER) {
      nextPathDirection = handleStartCharacter(map, nextPathDirection.X, nextPathDirection.Y);
    }
    if (currentCharacterWeAreOn === LEFT_RIGHT_CHARACTER || currentCharacterWeAreOn === UP_DOWN_CHARACTER) {
      nextPathDirection = getNextItemInPath(map, nextPathDirection);
    }
    if (currentCharacterWeAreOn === CORNER_CHARACTER) {
      nextPathDirection = handleCornerCharacter(map, nextPathDirection);
    }
    if (characterIsLetterWeHaveToCollect(currentCharacterWeAreOn)) {
      const characterWasNotCollected = !fullCharacterPath.some(
        (item) =>
          item.character === currentCharacterWeAreOn && item.X === nextPathDirection.X && item.Y === nextPathDirection.Y
      );

      if (characterWasNotCollected) {
        fullCharacterPath.push({
          character: currentCharacterWeAreOn,
          X: nextPathDirection.X,
          Y: nextPathDirection.Y,
        });
      }

      nextPathDirection = handleLetterWeNeedToCollect(map, nextPathDirection);
    }
    if (currentCharacterWeAreOn === ENDING_CHARACTER) {
      endReached = true;
    }
  }

  const collectedLetters = fullCharacterPath.map((obj) => obj.character).join("");
  const pathTraversed = pathCompleted.join("");

  return { collectedLetters, pathTraversed };
}

function handleLetterWeNeedToCollect(map: MapFormat, nextPathDirection: Path) {
  const letterIsACorner = !checkIfNextStepExists(map, nextPathDirection);
  if (letterIsACorner) {
    const cornerMove = whereToGoFromCorner(map, nextPathDirection);
    if (cornerMove.length > 1) {
      throw new Error("Fork in the path");
    }
    return getNextItemInPath(map, {
      ...nextPathDirection,
      move: cornerMove[0],
    });
  } else {
    return getNextItemInPath(map, nextPathDirection);
  }
}

function getNextItemInPath(map: MapFormat, nextPathDirection: Path): Path {
  const [rowMove, columnMove] = MOVES_BASED_ON_DIRECTION[nextPathDirection.move];
  const Y = columnMove + nextPathDirection.Y;
  const X = rowMove + nextPathDirection.X;

  const moveIsPossibleAndExists = checkIfNextStepExists(map, nextPathDirection);
  if (!moveIsPossibleAndExists) {
    throw new Error("No possible moves available, broken path");
  }
  return { move: nextPathDirection.move, X, Y };
}

function checkIfNextStepExists(map: MapFormat, nextPath: Path) {
  const moveValue = MOVES_BASED_ON_DIRECTION[nextPath.move];

  if (map[moveValue[0] + nextPath.X] === undefined) {
    return false;
  }
  if (
    map[moveValue[0] + nextPath.X][nextPath.Y + moveValue[1]] === undefined ||
    map[moveValue[0] + nextPath.X][nextPath.Y + moveValue[1]] === " "
  ) {
    return false;
  }

  return true;
}

function whereToGoFromCorner(map: MapFormat, path: Path): Move[] {
  const cornerGoesTheOppositeDirectionFromTheMove =
    path.move === Move.LEFT || path.move === Move.RIGHT ? [Move.UP, Move.DOWN] : [Move.RIGHT, Move.LEFT];
  const availableDirectionsForThisCorner = cornerGoesTheOppositeDirectionFromTheMove.filter((val) =>
    checkIfNextStepExists(map, { ...path, move: val })
  );
  const turnIsFake = availableDirectionsForThisCorner.length === 0;
  if (turnIsFake) {
    throw new Error("Fake turn");
  }

  return availableDirectionsForThisCorner;
}

function handleStartCharacter(map: MapFormat, row: number, column: number) {
  const possibleMovesArray = foundNearByAvailableMoves(map, row, column);
  if (possibleMovesArray.length > 1) {
    throw new Error("Multiple starting points");
  }
  return possibleMovesArray[0];
}

function foundNearByAvailableMoves(map: MapFormat, row: number, column: number): Path[] {
  const possiblePositionsFound: Path[] = [];

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
        X: newRowValue,
        Y: newColumnValue,
      });
    }
  }

  return possiblePositionsFound;
}

function handleCornerCharacter(map: MapFormat, path: Path): Path {
  const cornerMove = whereToGoFromCorner(map, path);
  if (cornerMove.length > 1) {
    throw new Error("Fork in the path");
  }
  return getNextItemInPath(map, { ...path, move: cornerMove[0] });
}
