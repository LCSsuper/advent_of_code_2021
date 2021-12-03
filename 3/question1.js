const fs = require("fs");

const dataset = fs.readFileSync("./dataset.txt").toString().split("\n");

const countByIndex = dataset.reduce((accumulator, current) => {
    for (let i = 0; i < current.length; i++) {
        accumulator[i] = {
            countZero:
                (accumulator[i]?.countZero || 0) + (current[i] === "0" ? 1 : 0),
            countOne:
                (accumulator[i]?.countOne || 0) + (current[i] === "1" ? 1 : 0),
        };
    }
    return accumulator;
}, []);

const generate = (type) => {
    let binary = "";
    for (const { countZero, countOne } of countByIndex) {
        if (type === "gamma") {
            binary += countOne > countZero ? "1" : "0";
        } else {
            binary += countOne < countZero ? "1" : "0";
        }
    }
    return parseInt(binary, 2);
};

console.log("😹", generate("gamma") * generate("epsilon"));
