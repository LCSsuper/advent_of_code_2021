const fs = require("fs");

const dataset = fs.readFileSync("./dataset.txt").toString().split("\n\n");

const dots = dataset[0]
    .split("\n")
    .map((dot) => dot.split(",").map((coordinate) => Number(coordinate)));

const instructions = dataset[1]
    .split("\n")
    .map((instruction) => instruction.split(" ").pop().split("="));

const logPaper = (arr) => {
    console.log(
        arr
            .map((row) => row.join(""))
            .concat("")
            .join("\n")
    );
};

const createAndFillPaper = () => {
    const sizeX = dots
        .map((c) => c[0])
        .sort((a, b) => a - b)
        .pop();
    const sizeY = dots
        .map((c) => c[1])
        .sort((a, b) => a - b)
        .pop();

    const paper = Array(sizeY + 1)
        .fill(null)
        .map(() => Array(sizeX + 1).fill("."));

    for (const [x, y] of dots) {
        paper[y][x] = "#";
    }

    return paper;
};

let paper;

const foldPaper = (direction, point) => {
    if (direction === "y") {
        const partToBeFolded = paper.splice(point);
        partToBeFolded.shift();
        partToBeFolded.reverse();
        for (let y = 0; y < partToBeFolded.length; y++) {
            for (let x = 0; x < partToBeFolded[y].length; x++) {
                if (partToBeFolded[y][x] === "#") {
                    paper[y][x] = "#";
                }
            }
        }
    }
    if (direction === "x") {
        for (const row of paper) {
            const partToBeFolded = row.splice(point);
            partToBeFolded.shift();
            partToBeFolded.reverse();
            for (let x = 0; x < partToBeFolded.length; x++) {
                if (partToBeFolded[x] === "#") {
                    row[x] = "#";
                }
            }
        }
    }
};

paper = createAndFillPaper();

for (const instruction of instructions) {
    foldPaper(...instruction);
}

logPaper(paper);
