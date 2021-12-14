const fs = require("fs");

const dataset = fs.readFileSync("./dataset.txt").toString().split("\n");

const openingCharacters = ["{", "[", "(", "<"];

const chunkMap = {
    "}": "{",
    "]": "[",
    ")": "(",
    ">": "<",
};

const getCorrespondingOpeningTag = (closingTag) => chunkMap[closingTag];

const parseLine = (line) => {
    let characters = [...line];
    const tags = [];
    for (const character of characters) {
        if (openingCharacters.includes(character)) {
            tags.push(character);
        } else {
            const openingTag = tags.pop();
            if (openingTag !== getCorrespondingOpeningTag(character)) {
                return character;
            }
        }
    }
};

const occurances = dataset.reduce((acc, line) => {
    const invalidCharacter = parseLine(line);
    if (!invalidCharacter) return acc;
    acc[invalidCharacter] = (acc[invalidCharacter] || 0) + 1;
    return acc;
}, {});

console.log(
    "👲",
    (occurances[")"] || 0) * 3 +
        (occurances["]"] || 0) * 57 +
        (occurances["}"] || 0) * 1197 +
        (occurances[">"] || 0) * 25137
);
