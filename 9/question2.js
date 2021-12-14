const fs = require("fs");

const dataset = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n")
    .map((row) =>
        row.split("").map((point) => ({ point: Number(point), basin: null }))
    );

for (let x = 0; x < dataset.length; x++) {
    for (let y = 0; y < dataset[x].length; y++) {
        const point = dataset[x][y].point;
        const up = dataset[x - 1]?.[y];
        const down = dataset[x + 1]?.[y];
        const left = dataset[x][y - 1];
        const right = dataset[x][y + 1];
        let moveTo;

        if (point === 9) continue;

        if (
            (up?.point === undefined || point < up?.point) &&
            (down?.point === undefined || point < down?.point) &&
            (left?.point === undefined || point < left?.point) &&
            (right?.point === undefined || point < right?.point)
        ) {
            dataset[x][y].basin = `${x},${y}`;
            continue;
        }

        if (point > up?.point) {
            if (!dataset[x][y].basin || up.basin) {
                moveTo = up.basin || `${x - 1},${y}`;
            }
        }

        if (point > left?.point) {
            if (!dataset[x][y].basin || left.basin) {
                moveTo = left.basin || `${x},${y - 1}`;
            }
        }

        if (point > right?.point) {
            if (!dataset[x][y].basin) {
                moveTo = `${x},${y + 1}`;
            }
        }

        if (point > down?.point) {
            if (!dataset[x][y].basin) {
                moveTo = `${x + 1},${y}`;
            }
        }

        if (!moveTo) continue;

        dataset[x][y].basin = moveTo;
        for (let previousX = 0; previousX <= x; previousX++) {
            for (
                let previousY = 0;
                previousY < dataset[previousX].length;
                previousY++
            ) {
                if (dataset[previousX][previousY].basin === `${x},${y}`) {
                    dataset[previousX][previousY].basin = moveTo;
                }
            }
        }
    }
}

const basins = dataset.reduce((acc, row) => {
    for (const point of row) {
        if (!point.basin) continue;
        if (!acc[point.basin]) {
            acc[point.basin] = 1;
        } else {
            acc[point.basin]++;
        }
    }
    return acc;
}, {});

console.log(
    "🤬",
    Object.values(basins)
        .sort((a, b) => b - a)
        .splice(0, 3)
        .reduce((acc, val) => acc * val)
);
