import { puzzleOne, puzzleTwo } from "src/day-01";
describe("Day 1", () => {
  describe("First Puzzle", () => {
    test("match the example", () => {
      const filename = "__tests__/day-0101.data.txt";
      expect(puzzleOne(filename)).toEqual(11);
    });
    test("match the real", () => {
      const filename = "__tests__/day-0101-real.data.txt";
      expect(puzzleOne(filename)).toEqual(1590491);
    });
  });
  describe("Second Puzzle", () => {
    test("match the example", () => {
      const filename = "__tests__/day-0102.data.txt";
      expect(puzzleTwo(filename)).toEqual(31);
    });
    test("match the real", () => {
      const filename = "__tests__/day-0102-real.data.txt";
      expect(puzzleTwo(filename)).toEqual(22588371);
    });
  });
});
