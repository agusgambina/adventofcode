import * as fs from "fs";

const puzzleOne = (filename: string) => {
  const fileContent = fs.readFileSync(filename, "utf8");

  const rows = fileContent
    .split("\n")
    .map((row) => row.split(" ").flatMap(Number));

  const isValidReport = (report: number[]) => {
    const greater = report.every((value, index, arr) => {
      if (index + 1 < arr.length) {
        return arr[index + 1] > value && arr[index + 1] - value < 4;
      }
      return true;
    });
    const less = report.every((value, index, arr) => {
      if (index + 1 < arr.length) {
        return arr[index + 1] < value && value - arr[index + 1] < 4;
      }
      return true;
    });
    return greater || less;
  };

  const validReports = rows.filter(isValidReport);
  return validReports.length;
};

const puzzleTwo = (filename: string) => {
  const fileContent = fs.readFileSync(filename, "utf8");

  const rows = fileContent
    .split("\n")
    .map((row) => row.split(" ").flatMap(Number));

  const isValidReport = (report: number[]) => {
    const greater = report.every((value, index, arr) => {
      if (arr.length > 2) {
        if (index + 1 < arr.length) {
          return arr[index + 1] > value && arr[index + 1] - value < 4;
        }
        return true;
      }
    });
    const less = report.every((value, index, arr) => {
      if (arr.length > 2) {
        if (index + 1 < arr.length) {
          return arr[index + 1] < value && value - arr[index + 1] < 4;
        }
        return true;
      }
    });
    return greater || less;
  };

  const validReports = rows.filter(isValidReport);

  const invalidReports = rows.filter((row) => !isValidReport(row));

  const isReportsWithOneLessValid = invalidReports.flatMap((report) => {
    return report.map((_, index, arr) => {
      if (isValidReport([...arr.slice(0, index), ...arr.slice(index + 1)])) {
        arr.splice(1);
        return true;
      }
    });
  });

  return validReports.length + isReportsWithOneLessValid.filter(Boolean).length;
};

export { puzzleOne, puzzleTwo };
