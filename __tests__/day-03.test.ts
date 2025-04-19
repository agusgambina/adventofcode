import { puzzleOne, puzzleTwo } from "src/day-03";

describe("Day 3", () => {
  describe("First Puzzle", () => {
    test("match the example", () => {
      const filename = "__tests__/day-0301.data.txt";
      expect(puzzleOne(filename)).toEqual(161);
    });
    test("match the real", () => {
      const filename = "__tests__/day-0301-real.data.txt";
      expect(puzzleOne(filename)).toEqual(178886550);
    });
  });
  describe("Second Puzzle", () => {
    test("match the example", () => {
      const filename = "__tests__/day-0302.data.txt";
      expect(puzzleTwo(filename)).toEqual(48);
    });
    test("match the real", () => {
      const filename = "__tests__/day-0302-real.data.txt";
      expect(puzzleTwo(filename)).toEqual(87163705);
    });
  });
});
