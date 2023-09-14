import fs from "fs";
import { ENDING_CHARACTER, STARTING_CHARACTER } from "../constants";
import { MapFormat, MapFromFile } from "../pathTraversal/pathTraversalModel";

export function getMapFromFile(filePath: string) {
  const loadedFile = readFile(filePath);

  return parseFileToMap(loadedFile);
}

function readFile(filePath: string) {
  try {
    return fs.readFileSync(filePath, { encoding: "utf-8" });
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

function parseFileToMap(file: string): MapFromFile {
  const fileLines = file.split("\n");
  const parsedChars: MapFormat = fileLines.map((strItem) => strItem.split(""));
  const { startingRowIndex, startingColumnIndex } = checkIfStartingAndEndSymbolExistCorrectly(parsedChars);

  return { map: parsedChars, startingRow: startingRowIndex, startingColumn: startingColumnIndex };
}

export function checkIfStartingAndEndSymbolExistCorrectly(pathMap: MapFormat) {
  let numberOfStartSymbols = 0;
  let numberOfEndSymbols = 0;
  let startingRowIndex = 0;
  let startingColumnIndex = 0;

  pathMap.forEach((column, x) => {
    column.forEach((character, y) => {
      if (character === STARTING_CHARACTER) {
        numberOfStartSymbols++;
        startingRowIndex = x;
        startingColumnIndex = y;
      }
      if (character === ENDING_CHARACTER) numberOfEndSymbols++;
    });
  });

  const wrongAmountOfStartSymbols = numberOfStartSymbols !== 1;
  const wrongAmountOfEndSymbols = numberOfEndSymbols !== 1;

  if (wrongAmountOfStartSymbols || wrongAmountOfEndSymbols) {
    throw new Error(
      `There should only be 1 start and 1 end symbol. Got: @: ${numberOfStartSymbols}, x: ${numberOfEndSymbols}`
    );
  }

  return { startingRowIndex, startingColumnIndex };
}
