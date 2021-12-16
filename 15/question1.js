const fs = require("fs");
const { find_path } = require("dijkstrajs");

const map = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n")
    .map((row) => row.split("").map((pos) => Number(pos)));

const graph = {};

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        const options = [
            [x, y - 1],
            [x, y + 1],
            [x - 1, y],
            [x + 1, y],
        ]
            .map((pos) => ({ pos, risk: map[pos[1]]?.[pos[0]] }))
            .filter((option) => !!option.risk)
            .reduce((acc, { pos, risk }) => {
                acc[`${pos[0]}_${pos[1]}`] = risk;
                return acc;
            }, {});
        options.cost = map[y][x];
        graph[`${x}_${y}`] = options;
    }
}

const path = find_path(graph, "0_0", "99_99");
path.shift();
console.log(
    "😑",
    path.map((position) => graph[position].cost).reduce((acc, val) => acc + val)
);
