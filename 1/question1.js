const fs = require("fs");

const dataset = fs.readFileSync("./dataset.txt").toString().split("\n");

const { count } = dataset.reduce(
    ({ previous, count }, current) => ({
        previous: Number(current),
        count:
            previous !== null && previous < Number(current) ? count + 1 : count,
    }),
    { previous: null, count: 0 }
);

console.log("😒", count);
