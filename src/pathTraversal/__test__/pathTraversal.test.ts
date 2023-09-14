import testCases from "../../__mocks__/TEST_VALUES.json";
import { followThePath } from "../pathTraversal";

describe("Test all the good map inputs", () => {
  test("The path result should be correct", () => {
    const mapsToTest = Object.values(testCases);

    for (const map of mapsToTest) {
      const { collectedLetters, pathTraversed } = followThePath({
        map: map.map,
        startingRow: map.x,
        startingColumn: map.y,
      });

      expect(pathTraversed).toMatch(map.path);
      expect(collectedLetters).toMatch(map.letters);
    }
  });
});
