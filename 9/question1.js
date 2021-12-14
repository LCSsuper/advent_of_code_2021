const fs = require("fs");

const dataset = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n")
    .map((row) => row.split("").map((point) => Number(point)));

const lowPoints = [];

for (let i = 0; i < dataset.length; i++) {
    for (let j = 0; j < dataset[i].length; j++) {
        const point = dataset[i][j];
        const up = dataset[i - 1]?.[j];
        const down = dataset[i + 1]?.[j];
        const left = dataset[i][j - 1];
        const right = dataset[i][j + 1];
        if (
            (up === undefined || point < up) &&
            (down === undefined || point < down) &&
            (left === undefined || point < left) &&
            (right === undefined || point < right)
        ) {
            lowPoints.push(point);
        }
    }
}

console.log(
    "🤬",
    lowPoints.reduce((acc, val) => acc + 1 + val, 0)
);
