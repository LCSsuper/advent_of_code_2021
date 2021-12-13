const fs = require("fs");

const dataset = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n")
    .map((row) => row.split(" | "))
    .map((row) => ({
        signalPatterns: row[0].split(" "),
        output: row[1].split(" "),
    }));

const count = dataset.reduce(
    (acc, { output }) =>
        acc +
        output.filter((display) => [2, 3, 4, 7].includes(display.length))
            .length,
    0
);

console.log("💁‍♀️", count);
