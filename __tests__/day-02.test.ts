import { puzzleOne, puzzleTwo } from "src/day-02";

describe("Day 2", () => {
  describe("First Puzzle", () => {
    test("match the example", () => {
      const filename = "__tests__/day-0201.data.txt";
      expect(puzzleOne(filename)).toEqual(2);
    });
    test("match the real", () => {
      const filename = "__tests__/day-0201-real.data.txt";
      expect(puzzleOne(filename)).toEqual(314);
    });
  });
  describe("Second Puzzle", () => {
    test.only("match the example", () => {
      const filename = "__tests__/day-0201.data.txt";
      expect(puzzleTwo(filename)).toEqual(4);
    });
    test("match the example", () => {
      const filename = "__tests__/day-0201-real.data.txt";
      expect(puzzleTwo(filename)).toEqual(-1);
    });
  });
});
