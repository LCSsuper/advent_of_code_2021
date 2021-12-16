const fs = require("fs");

const [rawPolymer, rawRules] = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n\n");

let polymer = rawPolymer.split("");
const rules = rawRules.split("\n").map((row) => {
    const [pair, insert] = row.split(" -> ");
    return { pair: pair.split(""), insert };
});

for (let step = 0; step < 10; step++) {
    const updatedPolymer = [];
    for (let i = 0; i < polymer.length; i++) {
        if (i + 1 === polymer.length) {
            updatedPolymer.push(polymer[i]);
            continue;
        }
        const { insert } = rules.find(
            ({ pair }) => pair[0] === polymer[i] && pair[1] === polymer[i + 1]
        );
        updatedPolymer.push(polymer[i]);
        updatedPolymer.push(insert);
    }
    polymer = [...updatedPolymer];
}

const counts = Object.values(
    polymer.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
    }, {})
);

counts.sort((a, b) => a - b);

console.log("👞", counts.pop() - counts.shift());
