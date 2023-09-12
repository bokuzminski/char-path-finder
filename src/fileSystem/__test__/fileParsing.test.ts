import { getMapFromFile } from "../fileParsing";

describe("Test file loading and parsing", () => {
  test("Test file loading works and returns correct values", async () => {
    const correctValue = {
      puzzle: [
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

    const map = await getMapFromFile("./puzzles/goonies.txt");

    expect(map).toEqual(correctValue);
  });
});
