import { Move } from "../pathTraversalModel";
import {
  calculateTheMoveBasedOnIndexes,
  characterIsLetterWeHaveToCollect,
  checkIfNextStepExists,
} from "../pathTraversalService";

describe("Test helper functions", () => {
  test("should detect incorrect characters", () => {
    expect(characterIsLetterWeHaveToCollect("Hello")).toBeFalsy();
    expect(characterIsLetterWeHaveToCollect("a")).toBeFalsy();
    expect(characterIsLetterWeHaveToCollect("$")).toBeFalsy();
    expect(characterIsLetterWeHaveToCollect("x")).toBeFalsy();
    expect(characterIsLetterWeHaveToCollect(" ")).toBeFalsy();
    expect(characterIsLetterWeHaveToCollect("")).toBeFalsy();
  });

  test("should detect correct characters", () => {
    expect(characterIsLetterWeHaveToCollect("A")).toBeTruthy();
    expect(characterIsLetterWeHaveToCollect("B")).toBeTruthy();
  });

  test("should return UP value", () => {
    const move = calculateTheMoveBasedOnIndexes([-1, 0]);

    expect(move).toBe(Move.UP);
  });
  test("should return DOWN value", () => {
    const move = calculateTheMoveBasedOnIndexes([1, 0]);

    expect(move).toBe(Move.DOWN);
  });
  test("should return LEFT value", () => {
    const move = calculateTheMoveBasedOnIndexes([0, -1]);

    expect(move).toBe(Move.LEFT);
  });
  test("should return RIGHT value", () => {
    const move = calculateTheMoveBasedOnIndexes([0, 1]);

    expect(move).toBe(Move.RIGHT);
  });

  test("should throw error when tuple is not in range", () => {
    expect(() => calculateTheMoveBasedOnIndexes([0, 0])).toThrowError("Tuple containing the move is wrong");
    expect(() => calculateTheMoveBasedOnIndexes([1, 1])).toThrowError("Tuple containing the move is wrong");
    expect(() => calculateTheMoveBasedOnIndexes([1, 2])).toThrowError("Tuple containing the move is wrong");
    expect(() => calculateTheMoveBasedOnIndexes([2, 1])).toThrowError("Tuple containing the move is wrong");
    expect(() => calculateTheMoveBasedOnIndexes([2, 2])).toThrowError("Tuple containing the move is wrong");
    expect(() => calculateTheMoveBasedOnIndexes([-1, -1])).toThrowError("Tuple containing the move is wrong");
    expect(() => calculateTheMoveBasedOnIndexes([-1, 2])).toThrowError("Tuple containing the move is wrong");
    expect(() => calculateTheMoveBasedOnIndexes([NaN, NaN])).toThrowError("Tuple containing the move is wrong");
  });

  test("test find next step function", () => {
    const workingMap = [["@", "-", "-", "-", "-", "-", "A", "-", "x"]];
    expect(
      checkIfNextStepExists(workingMap, { move: Move.RIGHT, currentRowIndex: 0, currentColumnIndex: 1 })
    ).toBeTruthy();

    const brokenMap = [["@", "-", " ", "", "-", "-", "A", "-", "x"]];
    expect(
      checkIfNextStepExists(brokenMap, { move: Move.RIGHT, currentRowIndex: 0, currentColumnIndex: 1 })
    ).toBeFalsy();
  });
});
