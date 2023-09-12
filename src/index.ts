import { MAP_FILES, getMapFromFile } from "./fileSystem/fileParsing";
import { followThePath } from "./pathTraversal/pathTraversal";

// START
(async () => {
  const { puzzle, startingRow, startingColumn } = await getMapFromFile(MAP_FILES.goonies);
  const { collectedLetters, pathTraversed } = followThePath(puzzle, startingRow, startingColumn);
  console.log(collectedLetters);
  console.log(pathTraversed);
})();

/* (async function createJSONTestFile() {
  const dirFiles = await fs.readdirSync("./puzzles");
  const fileToWriteTo: Record<string, any> = {};

  for (const file in dirFiles) {
    const puzzle = await readFile(`./puzzles/${dirFiles[file]}`);
    const fileLines = puzzle.split("\n");
    const parsedChars = fileLines.map((strItem) => strItem.split(""));
    fileToWriteTo[file] = { map: parsedChars };
  }

  await fs.writeFile("./TEST_VALUES.json", JSON.stringify(fileToWriteTo), () => console.log);
})();
 */
