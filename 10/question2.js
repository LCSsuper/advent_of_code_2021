const fs = require("fs");

const dataset = fs.readFileSync("./dataset.txt").toString().split("\n");

const openingCharacters = ["{", "[", "(", "<"];

const chunkMap = {
    "}": "{",
    "]": "[",
    ")": "(",
    ">": "<",
};

const pointsMap = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
};

const getCorrespondingOpeningTag = (closingTag) => chunkMap[closingTag];
const getCorrespondingClosingTag = (openingTag) =>
    Object.keys(chunkMap).find((key) => chunkMap[key] === openingTag);

const getRemainder = (line) => {
    let characters = [...line];
    const tags = [];
    for (const character of characters) {
        if (openingCharacters.includes(character)) {
            tags.push(character);
        } else {
            const openingTag = tags.pop();
            if (openingTag !== getCorrespondingOpeningTag(character)) {
                return undefined;
            }
        }
    }
    return tags
        .reverse()
        .map((openingTag) => getCorrespondingClosingTag(openingTag));
};

const remainders = dataset.map((line) => getRemainder(line)).filter((e) => !!e);
const scores = remainders
    .map((remainder) =>
        remainder.reduce((acc, val) => acc * 5 + pointsMap[val], 0)
    )
    .sort((a, b) => a - b);

console.log("👲", scores[Math.floor(scores.length / 2)]);
