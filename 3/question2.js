const fs = require("fs");

const dataset = fs.readFileSync("./dataset.txt").toString().split("\n");

const countDataset = (set) =>
    set.reduce((accumulator, current) => {
        for (let i = 0; i < current.length; i++) {
            accumulator[i] = {
                countZero:
                    (accumulator[i]?.countZero || 0) +
                    (current[i] === "0" ? 1 : 0),
                countOne:
                    (accumulator[i]?.countOne || 0) +
                    (current[i] === "1" ? 1 : 0),
            };
        }
        return accumulator;
    }, []);

const findRating = (type) => {
    let filterDepth = 0;
    let filteredSet = dataset;
    const filterDataset = (set) => {
        const count = countDataset(set);
        const { countOne, countZero } = count[filterDepth];
        const condition =
            type === "oxygen" ? countOne >= countZero : countZero > countOne;
        const newSet = set.filter(
            (e) => e[filterDepth] === (condition ? "1" : "0")
        );
        filterDepth++;
        return newSet;
    };
    while (filteredSet.length > 1) {
        filteredSet = filterDataset(filteredSet);
    }
    return parseInt(filteredSet[0], 2);
};

console.log("🤙", findRating("oxygen") * findRating("co2"));
