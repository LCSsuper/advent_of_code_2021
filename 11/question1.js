const fs = require("fs");

const dataset = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n")
    .map((row) => row.split("").map((value) => Number(value)));

let flashes = 0;
let flashedOctopuses = [];

const increaseEnergyLevelOfSurroundingOctopuses = (originX, originY) => {
    for (let x = originX - 1; x <= originX + 1; x++) {
        for (let y = originY - 1; y <= originY + 1; y++) {
            if (x === -1 || x === dataset.length) continue;
            if (y === -1 || y === dataset[x].length) continue;
            if (x === originX && y === originY) continue;
            increaseEnergyLevel(x, y);
        }
    }
};

const increaseEnergyLevel = (x, y) => {
    if (flashedOctopuses.includes(`${x}${y}`)) return;
    const octopusLevel = dataset[x][y];
    if (octopusLevel === 9) {
        flashes++;
        dataset[x][y] = 0;
        flashedOctopuses.push(`${x}${y}`);
        increaseEnergyLevelOfSurroundingOctopuses(x, y);
    } else {
        dataset[x][y] = octopusLevel + 1;
    }
};

for (let step = 0; step < 100; step++) {
    flashedOctopuses = [];
    for (let x = 0; x < dataset.length; x++) {
        for (let y = 0; y < dataset[x].length; y++) {
            increaseEnergyLevel(x, y);
        }
    }
}

console.log("👆", flashes);
