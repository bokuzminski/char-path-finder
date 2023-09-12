import { MAP_FILES, getMapFromFile } from "./fileSystem/fileParsing";
import { followThePath } from "./pathTraversal/pathTraversal";

(() => {
  const { puzzle, startingRow, startingColumn } = getMapFromFile(MAP_FILES.goonies);
  const { collectedLetters, pathTraversed } = followThePath(puzzle, startingRow, startingColumn);
  console.log(collectedLetters);
  console.log(pathTraversed);
})();
