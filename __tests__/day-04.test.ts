import {
  puzzleOne,
  puzzleTwo,
  getTranspose,
  getOriginal,
  getObliqueLeft,
  getObliqueRight,
} from "src/day-04";

describe("Day 4", () => {
  describe("matrix", () => {
    test("original", () => {
      const input = `ab
      cd`;
      expect(getOriginal(input)).toEqual(["ab", "cd"]);
    });
    test("transpose", () => {
      const input = `ab
      cd`;
      expect(getTranspose(input)).toEqual(["ac", "bd"]);
    });
    test("obliqueLeft", () => {
      const input = `abc
      def
      ghi`;
      expect(getObliqueLeft(input)).toEqual(["adg", "hbe", "fic"]);
    });
    test("obliqueLeft 5", () => {
      const input = `abcd
        efgh
        ijkl
        mnop`;
      expect(getObliqueLeft(input)).toEqual(["aeim", "nbfj", "kocg", "hlpd"]);
    });
    test("obliqueRight", () => {
      const input = `abc
      def
      ghi`;
      expect(getObliqueRight(input)).toEqual(["ceg", "bdi", "afh"]);
    });
  });
  describe("First Puzzle", () => {
    test("match the example", () => {
      const filename = "__tests__/day-0401.data.txt";
      expect(puzzleOne(filename)).toEqual(18);
    });
    test("match the real", () => {
      const filename = "__tests__/day-0401-real.data.txt";
      expect(puzzleOne(filename)).toEqual(2545);
    });
  });
  describe.skip("Second Puzzle", () => {
    test("match the example", () => {
      const filename = "__tests__/day-4302.data.txt";
      expect(puzzleTwo(filename)).toEqual(-1);
    });
    test("match the real", () => {
      const filename = "__tests__/day-0402-real.data.txt";
      expect(puzzleTwo(filename)).toEqual(-1);
    });
  });
});
