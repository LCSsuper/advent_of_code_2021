const fs = require("fs");

const dayCounts = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split(",")
    .map((dayCount) => Number(dayCount));

const defaultMap = new Map();
for (let i = 0; i < 9; i++) {
    defaultMap.set(i, 0);
}

const fishGroupedByDay = dayCounts.reduce((fishGroupedPerDay, dayCount) => {
    fishGroupedPerDay.has(dayCount)
        ? fishGroupedPerDay.set(dayCount, fishGroupedPerDay.get(dayCount) + 1)
        : fishGroupedPerDay.set(dayCount, 1);
    return fishGroupedPerDay;
}, defaultMap);

for (const day of Array(256).fill(null)) {
    const newFishToCreate = fishGroupedByDay.get(0);
    for (let i = 0; i < 8; i++) {
        fishGroupedByDay.set(i, fishGroupedByDay.get(i + 1));
    }
    fishGroupedByDay.set(6, fishGroupedByDay.get(6) + newFishToCreate);
    fishGroupedByDay.set(8, newFishToCreate);
}
const total = Array.from(fishGroupedByDay.values()).reduce(
    (total, countForDay) => total + countForDay,
    0
);
console.log("😑", total);
