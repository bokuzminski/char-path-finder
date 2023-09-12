import { MAP_FILES, getMapFromFile } from "./fileSystem/fileParsing";
import { followThePath } from "./pathTraversal/pathTraversal";

(() => {
  const map = getMapFromFile(MAP_FILES.goonies);
  const { collectedLetters, pathTraversed } = followThePath(map);

  console.log(collectedLetters);
  console.log(pathTraversed);
})();
