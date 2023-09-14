import {
  CORNER_CHARACTER,
  ENDING_CHARACTER,
  LEFT_RIGHT_CHARACTER,
  MOVES_BASED_ON_DIRECTION,
  STARTING_CHARACTER,
  UP_DOWN_CHARACTER,
} from "../constants";
import { calculateTheMoveBasedOnIndexes, characterIsLetterWeHaveToCollect } from "../helpers";
import {
  CollectedCharactersList,
  CurrentPathItem,
  MapFormat,
  MapFromFile,
  Move,
  TraveledPathResult,
} from "./pathTraversalModel";

export function followThePath({ map, startingRow, startingColumn }: MapFromFile): TraveledPathResult {
  const collectedCharacters: CollectedCharactersList = [];
  const completedPath: string[] = [];
  let endReached = false;
  let currentPathItem: CurrentPathItem = {
    move: Move.NONE,
    currentRowIndex: startingRow,
    currentColumnIndex: startingColumn,
  };

  while (!endReached) {
    const currentCharacterValue = map[currentPathItem.currentRowIndex][currentPathItem.currentColumnIndex];
    completedPath.push(currentCharacterValue);

    if (currentCharacterValue === ENDING_CHARACTER) {
      endReached = true;
      break;
    }
    if (characterIsLetterWeHaveToCollect(currentCharacterValue)) {
      collectLetter(currentCharacterValue);
    }
    currentPathItem = parseNextCharacter(map, currentPathItem);
  }

  const collectedLetters = collectedCharacters.map((obj) => obj.character).join("");
  const pathTraversed = completedPath.join("");

  return { collectedLetters, pathTraversed };

  function collectLetter(currentCharacterValue: string) {
    const characterWasNotCollected = !collectedCharacters.some(
      (item) =>
        item.character === currentCharacterValue &&
        item.characterRowLocation === currentPathItem.currentRowIndex &&
        item.characterColumnLocation === currentPathItem.currentColumnIndex
    );
    if (characterWasNotCollected) {
      collectedCharacters.push({
        character: currentCharacterValue,
        characterRowLocation: currentPathItem.currentRowIndex,
        characterColumnLocation: currentPathItem.currentColumnIndex,
      });
    }
  }
}

function parseNextCharacter(map: MapFormat, currentPathItem: CurrentPathItem) {
  const character = map[currentPathItem.currentRowIndex][currentPathItem.currentColumnIndex];

  if (character === STARTING_CHARACTER) {
    return handleStartCharacter(map, currentPathItem.currentRowIndex, currentPathItem.currentColumnIndex);
  } else if (character === LEFT_RIGHT_CHARACTER || character === UP_DOWN_CHARACTER) {
    return getNextItemInPath(map, currentPathItem);
  } else if (character === CORNER_CHARACTER) {
    return handleCornerCharacter(map, currentPathItem);
  } else if (characterIsLetterWeHaveToCollect(character)) {
    return handleLetterWeNeedToCollect(map, currentPathItem);
  }

  throw new Error("Invalid character found in the map");
}

function handleLetterWeNeedToCollect(map: MapFormat, nextPathDirection: CurrentPathItem) {
  const letterIsACorner = !checkIfNextStepExists(map, nextPathDirection);
  if (!letterIsACorner) {
    return getNextItemInPath(map, nextPathDirection);
  }

  const cornerMove = whereToGoFromCorner(map, nextPathDirection);
  if (cornerMove.length > 1) {
    throw new Error("Fork in the path");
  }
  return getNextItemInPath(map, {
    ...nextPathDirection,
    move: cornerMove[0],
  });
}

function getNextItemInPath(map: MapFormat, nextPathDirection: CurrentPathItem): CurrentPathItem {
  const [rowMove, columnMove] = MOVES_BASED_ON_DIRECTION[nextPathDirection.move];
  const moveIsPossibleAndExists = checkIfNextStepExists(map, nextPathDirection);
  if (!moveIsPossibleAndExists) {
    throw new Error("No possible moves available, broken path");
  }

  const nextRowIndex = rowMove + nextPathDirection.currentRowIndex;
  const nextColumnIndex = columnMove + nextPathDirection.currentColumnIndex;

  return { move: nextPathDirection.move, currentRowIndex: nextRowIndex, currentColumnIndex: nextColumnIndex };
}

function checkIfNextStepExists(map: MapFormat, nextStep: CurrentPathItem) {
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

function handleCornerCharacter(map: MapFormat, pathItem: CurrentPathItem): CurrentPathItem {
  const cornerMove = whereToGoFromCorner(map, pathItem);
  if (cornerMove.length > 1) {
    throw new Error("Fork in the path");
  }
  return getNextItemInPath(map, { ...pathItem, move: cornerMove[0] });
}

function whereToGoFromCorner(map: MapFormat, pathItem: CurrentPathItem): Move[] {
  const oppositeDirectionsFromThePath =
    pathItem.move === Move.LEFT || pathItem.move === Move.RIGHT ? [Move.UP, Move.DOWN] : [Move.RIGHT, Move.LEFT];

  const availableDirectionsForThisCorner = oppositeDirectionsFromThePath.filter((move) =>
    checkIfNextStepExists(map, { ...pathItem, move })
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

function foundNearByAvailableMoves(map: MapFormat, row: number, column: number): CurrentPathItem[] {
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
