import { getMapFromFile } from "../../fileSystem/fileParsing";
import { followThePath } from "../pathTraversal";

describe("Test bad inputs", () => {
  test("Broken path should throw an error", async () => {
    const { puzzle, startingRow, startingColumn } = await getMapFromFile("./badPuzzles/brokenPath.txt");
    expect(() => followThePath(puzzle, startingRow, startingColumn)).toThrowError("No possible moves available");
  });

  test("Fake turn should throw an error", async () => {
    const { puzzle, startingRow, startingColumn } = await getMapFromFile("./badPuzzles/faketurn.txt");
    expect(() => followThePath(puzzle, startingRow, startingColumn)).toThrowError("Fake turn");
  });

  test("Fork in the path should throw an error", async () => {
    const { puzzle, startingRow, startingColumn } = await getMapFromFile("./badPuzzles/forkInPath.txt");
    expect(() => followThePath(puzzle, startingRow, startingColumn)).toThrowError("Fork in the path");
  });

  test("Missing end character should throw an error", async () => {
    const errorMessage = "There should only be 1 start and 1 end symbol. Got: @: 1, x: 0";
    await expect(() => getMapFromFile("./badPuzzles/missingEndCharacter.txt")).rejects.toThrowError(errorMessage);
  });

  test("Missing start character should throw an error", async () => {
    const errorMessage = "There should only be 1 start and 1 end symbol. Got: @: 0, x: 1";

    await expect(() => getMapFromFile("./badPuzzles/missingStartCharacter.txt")).rejects.toThrowError(errorMessage);
  });

  test("Multiple start character should throw an error", async () => {
    const errorMessage = "There should only be 1 start and 1 end symbol. Got: @: 2, x: 1";

    await expect(() => getMapFromFile("./badPuzzles/multipleStarts.txt")).rejects.toThrowError(errorMessage);
  });
});
