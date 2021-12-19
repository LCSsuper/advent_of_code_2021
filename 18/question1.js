const fs = require("fs");

const numbers = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n")
    .map((number) => JSON.parse(number));

const reduceStep = (nr) => {
    const number = JSON.parse(JSON.stringify(nr));

    let depth = [0];

    const explode = (part) => {
        let [left, right] = part;
        depth.reduce((acc, index, i) => {
            if (depth.length - 1 === i) acc[index] = 0;
            return acc[index];
        }, number);

        let map = JSON.parse(JSON.stringify(depth));
        while (map[map.length - 1] === 0) map.pop();
        if (map.length) map[map.length - 1] = 0;
        while (map.length) {
            const candidate = map.reduce((acc, index) => acc[index], number);
            if (typeof candidate === "number") {
                map.reduce((acc, index, i) => {
                    if (map.length - 1 === i) {
                        acc[index] = candidate + left;
                    }
                    return acc[index];
                }, number);
                break;
            }
            map.push(1);
        }

        map = JSON.parse(JSON.stringify(depth));
        while (map[map.length - 1] === 1) map.pop();
        if (map.length) map[map.length - 1] = 1;
        while (map.length) {
            const candidate = map.reduce((acc, index) => acc[index], number);
            if (typeof candidate === "number") {
                map.reduce((acc, index, i) => {
                    if (map.length - 1 === i) {
                        acc[index] = candidate + right;
                    }
                    return acc[index];
                }, number);
                break;
            }
            map.push(0);
        }
        return number;
    };

    const split = (part) => {
        depth.reduce((acc, index, i) => {
            if (depth.length - 1 === i) {
                acc[index] = [Math.floor(part / 2), Math.ceil(part / 2)];
            }
            return acc[index];
        }, number);
        return number;
    };

    while (depth.length) {
        let part = depth.reduce((acc, index) => acc[index], number);
        if (typeof part === "number") {
            while (depth[depth.length - 1] === 1) depth.pop();
            if (depth.length) depth[depth.length - 1] = 1;
            continue;
        }

        if (depth.length === 4) return explode(part);

        depth.push(0);
    }

    depth = [0];
    while (depth.length) {
        let part = depth.reduce((acc, index) => acc[index], number);
        if (typeof part === "number") {
            if (part > 9) {
                return split(part);
            }

            while (depth[depth.length - 1] === 1) depth.pop();
            if (depth.length) depth[depth.length - 1] = 1;
            continue;
        }

        if (depth.length === 4) return explode(part);

        depth.push(0);
    }

    return number;
};

const reduce = (number) => {
    let reducedNumber = number;
    while (true) {
        const reduced = reduceStep(reducedNumber);
        if (JSON.stringify(reduced) === JSON.stringify(reducedNumber)) {
            return reducedNumber;
        }
        reducedNumber = reduced;
    }
};

const firstNumber = numbers.shift();
const finalNumber = numbers.reduce(
    (acc, val) => reduce([acc, val]),
    firstNumber
);

const calculateMagnitude = (number) => {
    if (typeof number === "number") return number;
    return (
        calculateMagnitude(number[0]) * 3 + calculateMagnitude(number[1]) * 2
    );
};

console.log("😦", calculateMagnitude(finalNumber));
