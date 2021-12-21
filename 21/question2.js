const memory = {};

const playRound = (data, diceValue, i, throws = 1) => {
    let { pos1, score1, pos2, score2 } = data;
    if (i === 0) {
        pos1 += diceValue;
    } else {
        pos2 += diceValue;
    }

    const key = `${diceValue}|${i}|${throws}|${pos1}|${score1}|${pos2}|${score2}`;

    if (memory[key]) return memory[key];

    if (throws === 3) {
        if (i === 0) {
            pos1 = pos1 % 10 || 10;
            score1 += pos1;
        } else {
            pos2 = pos2 % 10 || 10;
            score2 += pos2;
        }
        if (score1 >= 21) return [1, 0];
        if (score2 >= 21) return [0, 1];
    }

    const next = throws === 3 ? (i === 0 ? 1 : 0) : i;

    const scores = [
        playRound({ pos1, score1, pos2, score2 }, 1, next, throws + 1),
        playRound({ pos1, score1, pos2, score2 }, 2, next, throws + 1),
        playRound({ pos1, score1, pos2, score2 }, 3, next, throws + 1),
    ];

    const result = [
        scores.reduce((acc, val) => acc + val[0], 0),
        scores.reduce((acc, val) => acc + val[1], 0),
    ];
    memory[key] = result;
    return result;
};

playRound({ pos1: 4, score1: 0, pos2: 8, score2: 0 }, 1, 0);
playRound({ pos1: 4, score1: 0, pos2: 8, score2: 0 }, 2, 0);
playRound({ pos1: 4, score1: 0, pos2: 8, score2: 0 }, 3, 0);
