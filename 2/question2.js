const fs = require("fs");

const dataset = fs.readFileSync("./dataset.txt").toString().split("\n");

const { depth, hPos } = dataset.reduce(
    ({ depth, hPos, aim }, current) => {
        const [action, amount] = current.split(" ");
        return {
            hPos: action === "forward" ? hPos + Number(amount) : hPos,
            depth: action === "forward" ? depth + Number(amount) * aim : depth,
            aim:
                action !== "forward"
                    ? aim + Number(amount) * (action === "up" ? -1 : 1)
                    : aim,
        };
    },
    { depth: 0, hPos: 0, aim: 0 }
);

console.log("👏", depth * hPos);
