import { MAP_FILES } from "./constants";
import { getMapFromFile } from "./fileParsing/fileParsing";
import { followThePath } from "./pathTraversal/pathTraversal";

(() => {
  const map = getMapFromFile(MAP_FILES.goonies);
  const { collectedLetters, pathTraversed } = followThePath(map);

  console.log(collectedLetters);
  console.log(pathTraversed);
})();
