const target = { x: [209, 238], y: [-86, -59] };

const tryHitTarget = (vel) => {
    let position = { x: 0, y: 0 };
    let velocity = vel;
    let highestY = 0;

    while (true) {
        position.x += velocity.x;
        position.y += velocity.y;

        if (position.y > highestY) highestY = position.y;

        if (
            position.x >= target.x[0] &&
            position.x <= target.x[1] &&
            position.y >= target.y[0] &&
            position.y <= target.y[1]
        ) {
            return highestY;
        }

        if (
            (position.x < target.x[0] && velocity.x === 0) ||
            position.x > target.x[1] ||
            position.y < target.y[1]
        ) {
            return null;
        }

        velocity.x = velocity.x === 0 ? 0 : velocity.x - 1;
        velocity.y = velocity.y - 1;
    }
};

const highestYs = [];
for (let y = 0; y < 1000; y++) {
    for (let x = 0; x < 1000; x++) {
        const highestY = tryHitTarget({ x, y });
        if (highestY) highestYs.push(highestY);
    }
}

highestYs.sort((a, b) => b - a);

console.log("🙋‍♂️", highestYs[0]);
