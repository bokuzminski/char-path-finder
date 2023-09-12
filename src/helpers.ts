import { STARTING_CHARACTER } from "./constants";
import { MapFormat } from "./pathTraversal/pathTraversalModel";

export function characterIsLetterWeHaveToCollect(character: string) {
  return character.length === 1 && character.match(/[A-Z]/);
}

export function findStartingCharacterLocation(map: MapFormat) {
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < map[rowIndex].length; columnIndex++) {
      const element = map[rowIndex][columnIndex];

      if (element === STARTING_CHARACTER) {
        return [rowIndex, columnIndex];
      }
    }
  }
  return null;
}
