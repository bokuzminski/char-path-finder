import { MapFromFile } from "../../pathTraversal/pathTraversalModel";
import { checkIfStartingAndEndSymbolExistCorrectly, getMapFromFile } from "../fileParsing";

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

  test("Should throw an error when met with multiple start symbols", () => {
    const mapToTest: MapFromFile = {
      map: [
        [" ", " ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+"],
        [" ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "@"],
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
    const errorMsg = `There should only be 1 start and 1 end symbol. Got: @: ${2}, x: ${1}`;

    expect(() => checkIfStartingAndEndSymbolExistCorrectly(mapToTest.map)).toThrowError(errorMsg);
  });

  test("Should throw an error when met with multiple end symbols", () => {
    const mapToTest: MapFromFile = {
      map: [
        [" ", " ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+"],
        [" ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
        [" ", "@", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
        [" ", " ", " ", " ", " ", "|", " ", "x", " ", "+", "-", "+", " ", "E"],
        [" ", " ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "x"],
      ],
      startingRow: 3,
      startingColumn: 1,
    };
    const errorMsg = `There should only be 1 start and 1 end symbol. Got: @: ${1}, x: ${2}`;

    expect(() => checkIfStartingAndEndSymbolExistCorrectly(mapToTest.map)).toThrowError(errorMsg);
  });

  test("Should throw an error when there is no start and end symbol", () => {
    const mapToTest: MapFromFile = {
      map: [
        [" ", " ", " ", " ", " ", "+", "-", "O", "-", "N", "-", "+"],
        [" ", " ", " ", " ", " ", "|", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", "|", " ", " ", " ", "+", "-", "I", "-", "+"],
        [" ", " ", "-", "G", "-", "O", "-", "+", " ", "|", " ", "|", " ", "|"],
        [" ", " ", " ", " ", " ", "|", " ", "|", " ", "+", "-", "+", " ", "E"],
        [" ", " ", " ", " ", " ", "+", "-", "+", " ", " ", " ", " ", " ", "S"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "|"],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      ],
      startingRow: 3,
      startingColumn: 1,
    };
    const errorMsg = `There should only be 1 start and 1 end symbol. Got: @: ${0}, x: ${0}`;

    expect(() => checkIfStartingAndEndSymbolExistCorrectly(mapToTest.map)).toThrowError(errorMsg);
  });
});
