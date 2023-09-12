import testCases from "../../../TEST_VALUES.json";
import { followThePath } from "../pathTraversal";

describe("Test all the good puzzle inputs", () => {
  test("The path result should match", () => {
    const puzzles = Object.values(testCases);

    for (const puzzle of puzzles) {
      const { collectedLetters, pathTraversed } = followThePath(puzzle.map, puzzle.x, puzzle.y);

      expect(pathTraversed).toMatch(puzzle.path);
      expect(collectedLetters).toMatch(puzzle.letters);
    }
  });
});
