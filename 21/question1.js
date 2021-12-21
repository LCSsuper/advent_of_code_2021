const players = [
    { pos: 6, score: 0 },
    { pos: 3, score: 0 },
];

let diceRolls = 0;
let diceValue = 1;

const roll = () => {
    diceRolls++;
    const value = diceValue;
    diceValue = (diceValue + 1) % 100 || 100;
    return value;
};

while (true) {
    for (let i = 0; i < players.length; i++) {
        players[i].pos = (players[i].pos + roll() + roll() + roll()) % 10 || 10;
        players[i].score += players[i].pos;
        if (players[i].score >= 1000) {
            console.log("👼", players[i === 0 ? 1 : 0].score * diceRolls);
            return;
        }
    }
}
