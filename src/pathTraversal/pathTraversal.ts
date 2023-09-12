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
  Move,
  Path,
  TraveledPathResult,
  calculateTheMoveBasedOnIndexes,
} from "./pathTraversalModel";

export function followThePath(mapPath: MapFormat, startRow: number, startColumn: number): TraveledPathResult {
  let endReached = false;
  let nextPathDirection: Path = { move: null, X: startRow, Y: startColumn };
  let pathCompleted: string[] = [];
  const fullCharacterPath: CollectedCharactersList = [];

  while (!endReached) {
    const currentCharacterWeAreOn = mapPath[nextPathDirection.X][nextPathDirection.Y];
    pathCompleted.push(currentCharacterWeAreOn);

    if (currentCharacterWeAreOn === STARTING_CHARACTER) {
      const possibleMovesArray = foundNearByAvailableMoves(mapPath, nextPathDirection.X, nextPathDirection.Y);
      if (possibleMovesArray.length > 1) {
        throw new Error("Multiple points of start");
      }
      nextPathDirection = possibleMovesArray[0];
    }
    if (currentCharacterWeAreOn === LEFT_RIGHT_CHARACTER || currentCharacterWeAreOn === UP_DOWN_CHARACTER) {
      nextPathDirection = getNextPathItem(nextPathDirection.X, nextPathDirection.Y, nextPathDirection.move!);
    }
    if (currentCharacterWeAreOn === CORNER_CHARACTER) {
      const cornerMove = whereToGoFromCorner(nextPathDirection.X, nextPathDirection.Y, nextPathDirection.move!);
      if (cornerMove.length > 1) {
        throw new Error("Fork in the path");
      }
      nextPathDirection = getNextPathItem(nextPathDirection.X, nextPathDirection.Y, cornerMove[0]);
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

      const letterIsACorner = !checkIfNextStepExists(nextPathDirection.move!, nextPathDirection.X, nextPathDirection.Y);
      if (letterIsACorner) {
        const cornerMove = whereToGoFromCorner(nextPathDirection.X, nextPathDirection.Y, nextPathDirection.move!);
        if (cornerMove.length > 1) {
          throw new Error("Fork in the path");
        }
        nextPathDirection = getNextPathItem(nextPathDirection.X, nextPathDirection.Y, cornerMove[0]);
      } else {
        const nextLetterInPath = getNextPathItem(nextPathDirection.X, nextPathDirection.Y, nextPathDirection.move!);
        nextPathDirection = nextLetterInPath;
      }
    }
    if (currentCharacterWeAreOn === ENDING_CHARACTER) {
      endReached = true;
    }
  }

  const collectedLetters = fullCharacterPath.map((obj) => obj.character).join("");
  const pathTraversed = pathCompleted.join("");

  return { collectedLetters, pathTraversed };

  function getNextPathItem(row: number, column: number, move: Move): Path {
    const [rowMove, columnMove] = MOVES_BASED_ON_DIRECTION[move];
    const Y = columnMove + column;
    const X = rowMove + row;

    const moveIsPossibleAndExists = checkIfNextStepExists(move, row, column);
    if (!moveIsPossibleAndExists) {
      throw new Error("No possible moves available");
    }
    return { move, X, Y };
  }

  function checkIfNextStepExists(move: Move, row: number, column: number) {
    const moveValue = MOVES_BASED_ON_DIRECTION[move];

    if (mapPath[moveValue[0] + row] === undefined) {
      return false;
    }
    if (
      mapPath[moveValue[0] + row][column + moveValue[1]] === undefined ||
      mapPath[moveValue[0] + row][column + moveValue[1]] === " "
    ) {
      return false;
    }

    return true;
  }

  function whereToGoFromCorner(r: number, c: number, m: Move): Move[] {
    const cornerGoesTheOppositeDirectionFromTheMove =
      m === Move.LEFT || m === Move.RIGHT ? [Move.UP, Move.DOWN] : [Move.RIGHT, Move.LEFT];
    const availableDirectionsForThisCorner = cornerGoesTheOppositeDirectionFromTheMove.filter((val) =>
      checkIfNextStepExists(val, r, c)
    );
    const turnIsFake = availableDirectionsForThisCorner.length === 0;
    if (turnIsFake) {
      throw new Error("Fake turn");
    }

    return availableDirectionsForThisCorner;
  }
}

function foundNearByAvailableMoves(mapPath: MapFormat, row: number, column: number): Path[] {
  const possiblePositionsFound: Path[] = [];

  for (const [rowValue, columnValue] of Object.values(MOVES_BASED_ON_DIRECTION)) {
    const newRowValue = rowValue + row;
    const newColumnValue = columnValue + column;

    const rowIsWithinBounds = mapPath[newRowValue];
    const itemExists = rowIsWithinBounds && mapPath[newRowValue][newColumnValue];
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
