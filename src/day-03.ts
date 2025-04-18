import * as fs from "fs";

const unimplemented = (message: string = "Not implemented yet"): never => {
  throw new Error(message);
};

const puzzleOne = (filename: string) => {
  const fileContent = fs.readFileSync(filename, "utf8");

  const isValidSequence = (sequence: string): boolean => {
    if (sequence.length === 1) {
      if (sequence[0] === "m") {
        return true;
      } else {
        return false;
      }
    }
    if (sequence.length === 2) {
      if (sequence[1] === "u") {
        return true;
      } else {
        return false;
      }
    }
    if (sequence.length === 3) {
      if (sequence[2] === "l") {
        return true;
      } else {
        return false;
      }
    }
    if (sequence.length === 4) {
      if (sequence[3] === "(") {
        return true;
      } else {
        return false;
      }
    }
    const queue = sequence.slice(4);
    const lastChar = sequence.slice(-1);
    let firstNumber, secondNumber;
    if (!queue.includes(",")) {
      firstNumber = Number(queue);
      return firstNumber > -1 && firstNumber < 1000;
    }
    if (lastChar === ",") {
      firstNumber = Number(queue.slice(0, -1));
      return firstNumber > -1 && firstNumber < 1000;
    }
    if (queue.includes(",") && lastChar === ")") {
      const parameter = queue.toString().split(",");
      firstNumber = Number(parameter[0]);
      secondNumber = Number(parameter[1]);
      return (
        firstNumber > -1 &&
        firstNumber < 1000 &&
        secondNumber > -1 &&
        secondNumber < 1000
      );
    }
    if (queue.includes(",")) {
      const parameter = queue.toString().split(",");
      firstNumber = Number(parameter[0]);
      secondNumber = Number(parameter[1]);
      return (
        firstNumber > -1 &&
        firstNumber < 1000 &&
        secondNumber > -1 &&
        secondNumber < 1000
      );
    }
    return false;
  };

  const isSequenceFinished = (sequence: string): boolean =>
    sequence.slice(0, 4) === "mul(" &&
    Number(sequence.slice(5, sequence.length - 1).split(",")[0]) > -1 &&
    Number(sequence.slice(5, sequence.length - 1).split(",")[0]) < 1000 &&
    Number(sequence.slice(5, sequence.length - 1).split(",")[1]) > -1 &&
    Number(sequence.slice(5, sequence.length - 1).split(",")[0]) < 1000 &&
    sequence.slice(-1) === ")";

  const getParameters = (mulStr: string): number[] =>
    mulStr.substring(4, mulStr.indexOf(")")).split(",").map(Number);

  const multiplications = Array.from(fileContent).reduce(
    (multiplications, character) => {
      if (multiplications.length === 0) {
        if (isValidSequence(character)) {
          return [character];
        } else {
          return [];
        }
      } else {
        if (isSequenceFinished(multiplications.slice(-1)[0])) {
          if (isValidSequence(character)) {
            return [...multiplications, character];
          } else {
            return multiplications;
          }
        } else if (
          isSequenceFinished(multiplications.slice(-1)[0] + character)
        ) {
          return [
            ...multiplications.slice(0, -1),
            multiplications.slice(-1)[0] + character,
          ];
        } else if (isValidSequence(multiplications.slice(-1)[0] + character)) {
          return [
            ...multiplications.slice(0, -1),
            multiplications.slice(-1)[0] + character,
          ];
        } else {
          return [...multiplications.slice(0, -1)];
        }
      }
    },
    [],
  );

  console.log("--- multiplications --- ", multiplications);

  const total = multiplications
    .map((pair) => getParameters(pair))
    .reduce((acc, value) => {
      return acc + value[0] * value[1];
    }, 0);

  return total;
};

const puzzleTwo = (filename: string) => {
  const fileContent = fs.readFileSync(filename, "utf8");
};

export { puzzleOne, puzzleTwo };
