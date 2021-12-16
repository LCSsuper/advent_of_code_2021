const fs = require("fs");
const { find_path } = require("dijkstrajs");

const map = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n")
    .map((row) => row.split("").map((pos) => Number(pos)));

const graph = {};
for (let multiplyY = 0; multiplyY < 5; multiplyY++) {
    for (let y = 0; y < map.length; y++) {
        for (let multiplyX = 0; multiplyX < 5; multiplyX++) {
            for (let x = 0; x < map[y].length; x++) {
                const options = [
                    [x, y - 1],
                    [x, y + 1],
                    [x - 1, y],
                    [x + 1, y],
                ]
                    .map((pos) => {
                        let posX = pos[0];
                        let posY = pos[1];
                        let addToRisk = 0;
                        if (posX === -1 && multiplyX > 0) {
                            posX = map[y].length - 1;
                            addToRisk = -1;
                        }
                        if (posX === map[y].length && multiplyX < 4) {
                            posX = 0;
                            addToRisk = 1;
                        }
                        if (posY === -1 && multiplyY > 0) {
                            posY = map.length - 1;
                            addToRisk = -1;
                        }
                        if (posY === map.length && multiplyY < 4) {
                            posY = 0;
                            addToRisk = 1;
                        }
                        return { pos, risk: map[posY]?.[posX], addToRisk };
                    })
                    .filter((option) => !!option.risk)
                    .reduce((acc, { pos, risk, addToRisk }) => {
                        let newRisk = risk + multiplyY + multiplyX + addToRisk;
                        if (newRisk > 9) newRisk = newRisk - 9;
                        acc[
                            `${pos[0] + 100 * multiplyX}_${
                                pos[1] + 100 * multiplyY
                            }`
                        ] = newRisk;
                        return acc;
                    }, {});
                let cost = map[y][x] + multiplyY + multiplyX;
                if (cost > 9) cost = cost - 9;
                options.cost = cost;
                graph[`${x + 100 * multiplyX}_${y + 100 * multiplyY}`] =
                    options;
            }
        }
    }
}
const path = find_path(graph, "0_0", "499_499");
path.shift();
console.log(
    "😑",
    path.map((position) => graph[position].cost).reduce((acc, val) => acc + val)
);
