import { getMapFromFile } from "../../fileSystem/fileParsing";
import { followThePath } from "../pathTraversal";

describe("Test bad inputs", () => {
  test("Broken path should throw an error", () => {
    const map = getMapFromFile("./badPuzzles/brokenPath.txt");
    expect(() => followThePath(map)).toThrowError("No possible moves available");
  });

  test("Fake turn should throw an error", () => {
    const map = getMapFromFile("./badPuzzles/faketurn.txt");
    expect(() => followThePath(map)).toThrowError("Fake turn");
  });

  test("Fork in the path should throw an error", () => {
    const map = getMapFromFile("./badPuzzles/forkInPath.txt");
    expect(() => followThePath(map)).toThrowError("Fork in the path");
  });

  test("Missing end character should throw an error", () => {
    const errorMessage = "There should only be 1 start and 1 end symbol. Got: @: 1, x: 0";
    expect(() => getMapFromFile("./badPuzzles/missingEndCharacter.txt")).toThrowError(errorMessage);
  });

  test("Missing start character should throw an error", () => {
    const errorMessage = "There should only be 1 start and 1 end symbol. Got: @: 0, x: 1";

    expect(() => getMapFromFile("./badPuzzles/missingStartCharacter.txt")).toThrowError(errorMessage);
  });

  test("Multiple start character should throw an error", () => {
    const errorMessage = "There should only be 1 start and 1 end symbol. Got: @: 2, x: 1";

    expect(() => getMapFromFile("./badPuzzles/multipleStarts.txt")).toThrowError(errorMessage);
  });

  test("Multiple points of start should throw an error", () => {
    // Hardcoded because it has two "x" characters which throws the error before we start traversing
    const multipleStartingPaths = [["x", "-", "B", "-", "@", "-", "A", "-", "x"]];
    const errorMessage = "Multiple starting points";

    expect(() => followThePath({ map: multipleStartingPaths, startingRow: 0, startingColumn: 4 })).toThrowError(
      errorMessage
    );
  });
});
