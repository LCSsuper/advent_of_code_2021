const fs = require("fs");

const dataset = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split(",")
    .map((nr) => Number(nr));

const fuelPerHorizontalPosition = [];
for (
    let horizontalPosition = Math.min(...dataset);
    horizontalPosition <= Math.max(...dataset);
    horizontalPosition++
) {
    let fuel = 0;
    for (const nr of dataset) {
        fuel += Math.abs(horizontalPosition - nr);
    }
    fuelPerHorizontalPosition.push({ fuel, horizontalPosition });
}

console.log(fuelPerHorizontalPosition.sort((a, b) => a.fuel - b.fuel)[0]?.fuel);
