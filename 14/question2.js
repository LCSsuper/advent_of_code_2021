const fs = require("fs");

const [rawPolymer, rawRules] = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n\n");

const polymerTemplate = rawPolymer.split("");
const rules = rawRules.split("\n").map((row) => {
    const [pair, insert] = row.split(" -> ");
    return { pair: pair.split(""), insert };
});

let pairs = polymerTemplate.reduce((acc, val, i) => {
    if (i + 1 === polymerTemplate.length) return acc;
    acc[`${val}${polymerTemplate[i + 1]}`] =
        (acc[`${val}${polymerTemplate[i + 1]}`] || 0) + 1;
    return acc;
}, {});

for (let step = 0; step < 40; step++) {
    pairs = Object.keys(pairs).reduce((acc, val) => {
        const [left, right] = val.split("");

        const { insert } = rules.find(
            ({ pair }) => pair[0] === left && pair[1] === right
        );

        const add = pairs[val] || 1;
        acc[`${left}${insert}`] = (acc[`${left}${insert}`] || 0) + add;
        acc[`${insert}${right}`] = (acc[`${insert}${right}`] || 0) + add;
        return acc;
    }, {});
}

const counts = Object.values(
    Object.entries(pairs).reduce((acc, [key, val]) => {
        const [left, right] = key.split("");
        acc[left] = (acc[left] || 0) + val;
        acc[right] = (acc[right] || 0) + val;
        return acc;
    }, {})
).map((count) => Math.ceil(count / 2));

counts.sort((a, b) => a - b);

console.log("👞", counts.pop() - counts.shift());
