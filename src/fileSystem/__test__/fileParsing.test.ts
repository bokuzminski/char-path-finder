import { MapFromFile } from "../../pathTraversal/pathTraversalModel";
import { getMapFromFile } from "../fileParsing";

describe("Test file loading and parsing", () => {
  test("Test file loading works and returns correct values", () => {
    const correctValue: MapFromFile = {
      map: [
        [" ", " ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+"],
        [" ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
        [" ", "@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
        [" ", " ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
        [" ", " ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
      ],
      startingRow: 3,
      startingColumn: 1,
    };

    const result = getMapFromFile("./maps/goonies.txt");

    expect(result).toEqual(correctValue);
  });
});
