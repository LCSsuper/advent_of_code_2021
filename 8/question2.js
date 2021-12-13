const fs = require("fs");

const dataset = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n")
    .map((row) => row.split(" | "))
    .map((row) => ({
        signalPatterns: row[0].split(" "),
        output: row[1].split(" "),
    }));

const getDisplayNumberByMapping = (object, value) =>
    Object.keys(object).find(
        (key) => [...object[key]].sort().join("") === [...value].sort().join("")
    );

const convertedOutputs = dataset.map(({ signalPatterns, output }) => {
    const mapping = {
        0: null,
        1: signalPatterns.find((display) => display.length === 2),
        2: null,
        3: null,
        4: signalPatterns.find((display) => display.length === 4),
        5: null,
        6: null,
        7: signalPatterns.find((display) => display.length === 3),
        8: signalPatterns.find((display) => display.length === 7),
        9: null,
    };

    const hasAllSegments = (segments, segmentToCompareTo) =>
        segments.filter((display) => {
            for (const segment of [...segmentToCompareTo]) {
                if (![...display].includes(segment)) return false;
            }
            return true;
        })[0];

    // 6 segments analyser

    let displaysWithSixSegments = signalPatterns.filter(
        (display) => display.length === 6
    );

    mapping[9] = hasAllSegments(displaysWithSixSegments, mapping[4]);

    displaysWithSixSegments = displaysWithSixSegments.filter(
        (display) => display !== mapping[9]
    );

    mapping[0] = hasAllSegments(displaysWithSixSegments, mapping[1]);

    mapping[6] = displaysWithSixSegments.filter(
        (display) => display !== mapping[0]
    )[0];

    // 5 segments analyser

    let displaysWithFiveSegments = signalPatterns.filter(
        (display) => display.length === 5
    );

    mapping[3] = hasAllSegments(displaysWithFiveSegments, mapping[1]);

    displaysWithFiveSegments = displaysWithFiveSegments.filter(
        (display) => display !== mapping[3]
    );

    mapping[5] = displaysWithFiveSegments.filter((display) => {
        let sameSegmentCount = 0;
        for (const segment of [...mapping[9]]) {
            if ([...display].includes(segment)) sameSegmentCount++;
        }
        return sameSegmentCount === 5;
    })[0];

    mapping[2] = displaysWithFiveSegments.filter(
        (display) => display !== mapping[5]
    )[0];

    const convertedOutput = output.reduce((acc, val) => {
        return acc + getDisplayNumberByMapping(mapping, val);
    }, "");

    return convertedOutput;
});

console.log(
    "💁‍♀️",
    convertedOutputs.reduce((acc, val) => acc + Number(val), 0)
);
