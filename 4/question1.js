const fs = require("fs");

const dataset = fs.readFileSync("./dataset.txt").toString().split("\n\n");
const numbersToCall = dataset.shift().split(",");
const cards = dataset.map((card) =>
    card.split("\n").map((row) => row.split(" ").filter((e) => !!e))
);

const markCalledNumber = (card, calledNumber) => {
    for (const row of card) {
        const index = row.indexOf(calledNumber);
        if (index > -1) row[index] = null;
    }
};

const bingoCardSize = 5;
const cardHasBingo = (card) => {
    const entireListIsMarked = (list) =>
        list.filter((cell) => cell === null).length === bingoCardSize;

    for (let i = 0; i < bingoCardSize; i++) {
        const row = card[i];
        const column = Array(bingoCardSize)
            .fill(null)
            .map((_, j) => card[j][i]);

        if (entireListIsMarked(row) || entireListIsMarked(column)) {
            return true;
        }
    }

    return false;
};

const addRemainingNumbers = (card) =>
    card.reduce(
        (acc, row) =>
            acc + row.reduce((rowAcc, cell) => rowAcc + Number(cell), 0),
        0
    );

for (const number of numbersToCall) {
    for (const card of cards) {
        markCalledNumber(card, number);
        if (cardHasBingo(card)) {
            const sumOfUnmarkedNumbers = addRemainingNumbers(card);
            console.log("🖐", sumOfUnmarkedNumbers * Number(number));
            return;
        }
    }
}
