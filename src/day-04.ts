import * as fs from "fs";

const getOriginal = (input: string): string[] => {
  const lines = input.split("\n").map((line) => line.trim());
  return lines;
};

const getTranspose = (input: string): string[] => {
  const lines = input.split("\n").map((line) => line.trim());
  const matrixTranspose = lines.reduce((newMatrix, line) => {
    return Array.from(line).map((character, index) => {
      if (newMatrix[index] === undefined) {
        return character;
      } else {
        return newMatrix[index] + character;
      }
    });
  }, []);
  return matrixTranspose;
};

const getObliqueLeft = (input: string): string[] => {
  const lines = input.split("\n").map((line) => line.trim());

  // Create initial array of arrays with the right dimensions
  const initialMatrix = Array.from({ length: lines.length }, () =>
    Array.from({ length: lines.length }, () => ""),
  );

  // Build matrix using reduce
  const newMatrix = lines.reduce(
    (matrix, line, i) =>
      Array.from(line).reduce((acc, char, j) => {
        return acc.map((row, rowIndex) =>
          rowIndex === j
            ? [
                ...row.slice(0, (i + j) % line.length),
                char,
                ...row.slice(((i + j) % line.length) + 1),
              ]
            : row,
        );
      }, matrix),
    initialMatrix,
  );

  return newMatrix.map((row) => row.join(""));
};

const getObliqueRight = (input: string): string[] => {
  const lines = input.split("\n").map((line) => line.trim());

  // Create initial empty matrix of the right size
  const initialMatrix = Array.from({ length: lines.length }, () =>
    Array.from({ length: lines.length }, () => ""),
  );

  // Use reduce to build the transformed matrix
  const transformedMatrix = lines.reduce(
    (matrix, line, i) =>
      [...line].reduce((acc, char, j) => {
        const newRow = line.length - 1 - ((i + j) % line.length);
        const newCol = i;

        return acc.map((row, rowIndex) =>
          rowIndex === newRow
            ? row.map((cell, colIndex) => (colIndex === newCol ? char : cell))
            : row,
        );
      }, matrix),
    initialMatrix,
  );

  // Convert matrix to string array
  return transformedMatrix.map((row) => row.join(""));
};

const countXmas = (soup: string[]): number => {
  return soup.reduce((acc, str) => {
    return (
      acc +
      str.split("X").filter((substring) => substring.startsWith("MAS")).length
    );
  }, 0);
};

const XMAS = "XMAS";

const puzzleOne = (filename: string) => {
  const fileContent = fs.readFileSync(filename, "utf8");

  const searchWordMatrix = fileContent
    .split("\n")
    .map((line) => line.split(""));

  const rewriteMatrix = (
    searchWordMatrix: string[][],
  ): { matrix: string[][]; count: number } => {
    let count = 0;
    const matrix = Array.from({ length: searchWordMatrix.length }, () =>
      Array.from({ length: searchWordMatrix.length }, () => ""),
    );
    for (let i = 0; i < searchWordMatrix.length; i++) {
      const row = searchWordMatrix[i];
      for (let j = 0; j < row.length; j++) {
        if (searchWordMatrix[i][j] === "X") {
          // left-right
          if (j + XMAS.length <= row.length) {
            if (
              searchWordMatrix[i][j + 1] === "M" &&
              searchWordMatrix[i][j + 2] === "A" &&
              searchWordMatrix[i][j + 3] === "S"
            ) {
              count++;
              matrix[i][j] = "X";
              matrix[i][j + 1] = "M";
              matrix[i][j + 2] = "A";
              matrix[i][j + 3] = "S";
            }
          }
          // rigt-left
          if (j - XMAS.length > -2) {
            if (
              searchWordMatrix[i][j - 1] === "M" &&
              searchWordMatrix[i][j - 2] === "A" &&
              searchWordMatrix[i][j - 3] === "S"
            ) {
              count++;
              matrix[i][j] = "X";
              matrix[i][j - 1] = "M";
              matrix[i][j - 2] = "A";
              matrix[i][j - 3] = "S";
            }
          }
          // up-down
          if (i + XMAS.length <= searchWordMatrix.length) {
            if (
              searchWordMatrix[i + 1][j] === "M" &&
              searchWordMatrix[i + 2][j] === "A" &&
              searchWordMatrix[i + 3][j] === "S"
            ) {
              count++;
              matrix[i][j] = "X";
              matrix[i + 1][j] = "M";
              matrix[i + 2][j] = "A";
              matrix[i + 3][j] = "S";
            }
          }
          // down-up
          if (i - XMAS.length > -2) {
            if (
              searchWordMatrix[i - 1][j] === "M" &&
              searchWordMatrix[i - 2][j] === "A" &&
              searchWordMatrix[i - 3][j] === "S"
            ) {
              count++;
              matrix[i][j] = "X";
              matrix[i - 1][j] = "M";
              matrix[i - 2][j] = "A";
              matrix[i - 3][j] = "S";
            }
          }
          // diagonal left-right-down
          if (
            i + XMAS.length <= searchWordMatrix.length &&
            j + XMAS.length <= row.length
          ) {
            if (
              searchWordMatrix[i + 1][j + 1] === "M" &&
              searchWordMatrix[i + 2][j + 2] === "A" &&
              searchWordMatrix[i + 3][j + 3] === "S"
            ) {
              count++;
              matrix[i][j] = "X";
              matrix[i + 1][j + 1] = "M";
              matrix[i + 2][j + 2] = "A";
              matrix[i + 3][j + 3] = "S";
            }
          }
          // diagonal left-right-up
          if (i - XMAS.length > -2 && j - XMAS.length <= row.length) {
            if (
              searchWordMatrix[i - 1][j + 1] === "M" &&
              searchWordMatrix[i - 2][j + 2] === "A" &&
              searchWordMatrix[i - 3][j + 3] === "S"
            ) {
              count++;
              matrix[i][j] = "X";
              matrix[i - 1][j + 1] = "M";
              matrix[i - 2][j + 2] = "A";
              matrix[i - 3][j + 3] = "S";
            }
          }
          // diagonal right-left-down
          if (
            i + XMAS.length <= searchWordMatrix.length &&
            j - XMAS.length > -2
          ) {
            if (
              searchWordMatrix[i + 1][j - 1] === "M" &&
              searchWordMatrix[i + 2][j - 2] === "A" &&
              searchWordMatrix[i + 3][j - 3] === "S"
            ) {
              count++;
              matrix[i][j] = "X";
              matrix[i + 1][j - 1] = "M";
              matrix[i + 2][j - 2] = "A";
              matrix[i + 3][j - 3] = "S";
            }
          }
          // diagonal right-left-up
          if (i - XMAS.length > -2 && j - XMAS.length > -2) {
            if (
              searchWordMatrix[i - 1][j - 1] === "M" &&
              searchWordMatrix[i - 2][j - 2] === "A" &&
              searchWordMatrix[i - 3][j - 3] === "S"
            ) {
              count++;
              matrix[i][j] = "X";
              matrix[i - 1][j - 1] = "M";
              matrix[i - 2][j - 2] = "A";
              matrix[i - 3][j - 3] = "S";
            }
          }
        }
      }
    }
    return { matrix, count };
  };

  const printMatrix = (matrix: string[]) => {
    // matrix.map((line) => console.log(line));
    console.log(matrix.join("\n").toString());
  };

  const result = rewriteMatrix(searchWordMatrix);

  const newMatrix = result.matrix.map((matrix) => {
    const str = matrix.map((char) => (char === "" ? "." : char)).join("");
    console.log("--- str --- ", str);
    return str;
  });

  printMatrix(newMatrix);
  return result.count;
};

// const puzzleOne = (filename: string) => {
//   const fileContent = fs.readFileSync(filename, "utf8");

//   const original = getOriginal(fileContent);
//   const originalCount = countXmas(original);
//   console.log("--- original --- ", original);
//   console.log("--- originalCount --- ", originalCount);

//   const originalReverse = original.map((line) =>
//     Array.from(line).reverse().join(""),
//   );
//   const originalReverseCount = countXmas(originalReverse);
//   console.log("--- originalReverse --- ", originalReverse);
//   console.log("--- originalReverseCount --- ", originalReverseCount);

//   const transpose = getTranspose(fileContent);
//   const transposeCount = countXmas(transpose);
//   console.log("--- transpose --- ", transpose);
//   console.log("--- transposeCount --- ", transposeCount);

//   const transposeReverse = transpose.map((line) =>
//     Array.from(line).reverse().join(""),
//   );
//   const transposeReverseCount = countXmas(transposeReverse);
//   console.log("--- transposeReverse --- ", transposeReverse);
//   console.log("--- transposeReverseCount --- ", transposeReverseCount);

//   const obliqueLeft = getObliqueLeft(fileContent);
//   const obliqueLeftCount = countXmas(obliqueLeft);
//   console.log("--- obliqueLeft --- ", obliqueLeft);
//   console.log("--- obliqueLeftCount --- ", obliqueLeftCount);

//   const obliqueLeftReverse = obliqueLeft.map((line) =>
//     Array.from(line).reverse().join(""),
//   );
//   const obliqueLeftReverseCount = countXmas(obliqueLeftReverse);
//   console.log("--- obliqueLeftReverse --- ", obliqueLeftReverse);
//   console.log("--- obliqueLeftReverseCount --- ", obliqueLeftReverseCount);

//   const obliqueRight = getObliqueRight(fileContent);
//   const obliqueRightCount = countXmas(obliqueRight);
//   console.log("--- obliqueRight --- ", obliqueRight);
//   console.log("--- obliqueRightCount --- ", obliqueRightCount);

//   const obliqueRightReverse = obliqueRight.map((line) =>
//     Array.from(line).reverse().join(""),
//   );
//   const obliqueRightReverseCount = countXmas(obliqueRightReverse);
//   console.log("--- obliqueRightReverse --- ", obliqueRightReverse);
//   console.log("--- obliqueRightReverseCount --- ", obliqueRightReverseCount);

//   const total =
//     originalCount +
//     originalReverseCount +
//     transposeCount +
//     transposeReverseCount +
//     obliqueLeftCount +
//     obliqueLeftReverseCount;
//   obliqueLeftCount + obliqueLeftReverseCount;

//   return total;
// };

const puzzleTwo = (filename: string) => {
  const fileContent = fs.readFileSync(filename, "utf8");
};

export {
  puzzleOne,
  puzzleTwo,
  getTranspose,
  getOriginal,
  getObliqueLeft,
  getObliqueRight,
};
