import * as fs from "fs";

const puzzleOne = (filename: string) => {
  const fileContent = fs.readFileSync(filename, "utf8");

  const rows = fileContent
    .split("\n")
    .map((row) => row.split(" ").flatMap(Number));

  const getReportSummary = (
    report: number[],
  ): { isValid: boolean; comparisonType: string }[] =>
    report.reduce((result, value, index, arr) => {
      if (index + 1 === arr.length) {
        return result;
      }

      if (value > arr[index + 1]) {
        return [
          ...result,
          { isValid: value - arr[index + 1] < 4, comparisonType: "<" },
        ];
      }

      if (value < arr[index + 1]) {
        return [
          ...result,
          { isValid: arr[index + 1] - value < 4, comparisonType: ">" },
        ];
      }

      if (value === arr[index + 1]) {
        return [...result, { isValid: false, comparisonType: "=" }];
      }
    }, []);

  const isValidReports = (
    reports: { isValid: boolean; comparisonType: string }[],
  ): boolean => {
    return reports.every(
      (report) =>
        report.isValid && report.comparisonType === reports[0].comparisonType,
    );
  };

  const reportsSummaries = rows.map((row) => getReportSummary(row));

  const result = reportsSummaries.filter(isValidReports);

  return result.length;
};

const puzzleTwo = (filename: string) => {
  return -1;
};

export { puzzleOne, puzzleTwo };
