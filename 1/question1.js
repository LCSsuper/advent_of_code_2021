const fs = require("fs");

const dataset = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n")
    .map((nr) => Number(nr));

const { count } = dataset.reduce(
    ({ previous, count }, current) => ({
        previous: current,
        count: previous !== null && previous < current ? count + 1 : count,
    }),
    { previous: null, count: 0 }
);

console.log("😒", count);
