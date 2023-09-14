import {
  CORNER_CHARACTER,
  ENDING_CHARACTER,
  LEFT_RIGHT_CHARACTER,
  STARTING_CHARACTER,
  UP_DOWN_CHARACTER,
} from "../constants";
import {
  CollectedCharactersList,
  CurrentPathItem,
  MapFormat,
  MapFromFile,
  Move,
  TraveledPathResult,
} from "./pathTraversalModel";
import {
  characterIsLetterWeHaveToCollect,
  checkIfNextMoveExists,
  findFirstMoveFromStartingSymbol,
  findMoveAfterCorner,
  getNextItemInPath,
} from "./pathTraversalService";

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

  const collectedLetters = collectedCharacters.map(({ character }) => character).join("");
  const pathTraversed = completedPath.join("");

  return { collectedLetters, pathTraversed };

  function collectLetter(currentCharacterValue: string) {
    const characterWasNotCollected = !collectedCharacters.some(
      ({ character, characterColumnLocation, characterRowLocation }) =>
        character === currentCharacterValue &&
        characterRowLocation === currentPathItem.currentRowIndex &&
        characterColumnLocation === currentPathItem.currentColumnIndex
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
  const letterIsACorner = !checkIfNextMoveExists(map, nextPathDirection);
  if (!letterIsACorner) {
    return getNextItemInPath(map, nextPathDirection);
  }

  const cornerMove = findMoveAfterCorner(map, nextPathDirection);

  return getNextItemInPath(map, {
    ...nextPathDirection,
    move: cornerMove,
  });
}

function handleCornerCharacter(map: MapFormat, pathItem: CurrentPathItem): CurrentPathItem {
  const cornerMove = findMoveAfterCorner(map, pathItem);

  return getNextItemInPath(map, { ...pathItem, move: cornerMove });
}

function handleStartCharacter(map: MapFormat, row: number, column: number) {
  const possibleMovesArray = findFirstMoveFromStartingSymbol(map, row, column);
  if (possibleMovesArray.length > 1) {
    throw new Error("Multiple starting points");
  }

  return possibleMovesArray[0];
}
