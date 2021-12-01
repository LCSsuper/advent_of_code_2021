const fs = require("fs");

const dataset = fs.readFileSync("./dataset.txt").toString().split("\n");

const slidingWindowSize = 3;

const { count } = dataset.reduce(
    ({ slidingWindow, previousAccumulation, count }, current) => {
        if (slidingWindow.length === slidingWindowSize) {
            slidingWindow.shift();
        }
        slidingWindow.push(Number(current));

        const currentAccumulation = slidingWindow.reduce(
            (acc, total) => acc + total,
            0
        );

        return {
            slidingWindow,
            previousAccumulation:
                slidingWindow.length === slidingWindowSize
                    ? currentAccumulation
                    : null,
            count:
                previousAccumulation !== null &&
                previousAccumulation < currentAccumulation
                    ? count + 1
                    : count,
        };
    },
    { slidingWindow: [], previousAccumulation: null, count: 0 }
);

console.log("😒", count);
