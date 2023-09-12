import { MAP_FILES, getMapFromFile } from "./fileSystem/fileParsing";
import { followThePath } from "./pathTraversal/pathTraversal";

// START
(async () => {
  const { puzzle, startingRow, startingColumn } = await getMapFromFile(MAP_FILES.goonies);
  const { collectedLetters, pathTraversed } = followThePath(puzzle, startingRow, startingColumn);
  console.log(collectedLetters);
  console.log(pathTraversed);
})();
