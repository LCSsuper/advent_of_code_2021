const fs = require("fs");

const dataset = fs.readFileSync("./dataset.txt").toString().split("\n");

const { depth, hPos } = dataset.reduce(
    ({ depth, hPos }, current) => {
        const [action, amount] = current.split(" ");
        return {
            hPos: action === "forward" ? hPos + Number(amount) : hPos,
            depth:
                action !== "forward"
                    ? depth + Number(amount) * (action === "up" ? -1 : 1)
                    : depth,
        };
    },
    { depth: 0, hPos: 0 }
);

console.log("👏", depth * hPos);
