const fs = require("fs");

const dataset = fs.readFileSync("./dataset.txt").toString().split("\n");
const lines = dataset.map((line) =>
    line
        .split(" -> ")
        .map((points) =>
            points.split(",").map((coordinate) => Number(coordinate))
        )
);

const markedPoints = lines.reduce((markedPoints, line) => {
    const [[x1, y1], [x2, y2]] = line;
    let getKey, start, end;
    if (x1 === x2) {
        getKey = (i) => `${x1},${i}`;
        start = y1 < y2 ? y1 : y2;
        end = y1 < y2 ? y2 : y1;
    } else if (y1 === y2) {
        getKey = (i) => `${i},${y1}`;
        start = x1 < x2 ? x1 : x2;
        end = x1 < x2 ? x2 : x1;
    } else {
        const [xA, xB, yA, yB] = x1 < x2 ? [x1, x2, y1, y2] : [x2, x1, y2, y1];
        for (let i = 0; i <= xB - xA; i++) {
            const key = `${xA + i},${yA < yB ? yA + i : yA - i}`;
            if (markedPoints.has(key)) {
                markedPoints.set(key, markedPoints.get(key) + 1);
            } else {
                markedPoints.set(key, 1);
            }
        }
    }

    if ((start, end, getKey)) {
        for (let i = start; i <= end; i++) {
            const key = getKey(i);
            if (markedPoints.has(key)) {
                markedPoints.set(key, markedPoints.get(key) + 1);
            } else {
                markedPoints.set(key, 1);
            }
        }
    }
    return markedPoints;
}, new Map());

console.log(
    "🦸‍♂️",
    Array.from(markedPoints.values()).filter((count) => count > 1).length
);
