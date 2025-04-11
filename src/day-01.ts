import * as fs from "fs";

const distance = (a: number, b: number) => {
  if (a > b) {
    return a - b;
  }
  return b - a;
};

const puzzleOne = (filename: string) => {
  const fileContent = fs.readFileSync(filename, "utf8");

  const lists = fileContent.split("\n").reduce(
    (acc, value) => {
      const [a, b] = value.split("   ").map((x) => Number(x));
      return [[...acc[0], a].sort(), [...acc[1], b].sort()];
    },
    [[], []],
  );

  const listLeft = lists[0];
  const listRight = lists[1];

  return listLeft.reduce((acc, value, index) => {
    return acc + distance(value, listRight[index]);
  }, 0);
};

const puzzleTwo = (filename: string) => {
  const fileContent = fs.readFileSync(filename, "utf8");

  const lists = fileContent.split("\n").reduce(
    (acc, value) => {
      const [a, b] = value.split("   ").map((x) => Number(x));
      return [[...acc[0], a].sort(), [...acc[1], b].sort()];
    },
    [[], []],
  );

  const listLeft = lists[0];
  const listRight = lists[1];

  return listLeft.reduce((acc, value) => {
    return acc + listRight.filter((x) => x === value).length * value;
  }, 0);
};

export { puzzleOne, puzzleTwo };
