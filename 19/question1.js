const fs = require("fs");

const dataset = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n\n")
    .map((scanner) => {
        const beacons = scanner.split("\n");
        beacons.shift();
        return beacons.map((position) => {
            const [x, y, z] = position.split(",");
            return { x: Number(x), y: Number(y), z: Number(z) };
        });
    });

const intersect = (array1, array2) =>
    array1.filter((value) => array2.includes(value));

// const calculateOrientations = (orientation) => {
//     return [
//         orientation,
//         orientation.map(({ x, y, z }) => ({ x: y, y: -x, z })),
//         orientation.map(({ x, y, z }) => ({ x: -x, y: -y, z })),
//         orientation.map(({ x, y, z }) => ({ x: -y, y: x, z })),

//         orientation.map(({ x, y, z }) => ({ x: -z, y: -x, z: y })),
//         orientation.map(({ x, y, z }) => ({ x: -x, y: z, z: y })),
//         orientation.map(({ x, y, z }) => ({ x: z, y: x, z: y })),
//         orientation.map(({ x, y, z }) => ({ x: x, y: -z, z: y })),

//         orientation.map(({ x, y, z }) => ({ x: -z, y: y, z: x })),
//         orientation.map(({ x, y, z }) => ({ x: y, y: z, z: x })),
//         orientation.map(({ x, y, z }) => ({ x: z, y: -y, z: x })),
//         orientation.map(({ x, y, z }) => ({ x: -y, y: -z, z: x })),

//         orientation.map(({ x, y, z }) => ({ x: -x, y: y, z: -z })),
//         orientation.map(({ x, y, z }) => ({ x: y, y: x, z: -z })),
//         orientation.map(({ x, y, z }) => ({ x: x, y: -y, z: -z })),
//         orientation.map(({ x, y, z }) => ({ x: -y, y: x, z: -z })),

//         orientation.map(({ x, y, z }) => ({ x: x, y: z, z: -y })),
//         orientation.map(({ x, y, z }) => ({ x: z, y: -x, z: -y })),
//         orientation.map(({ x, y, z }) => ({ x: -x, y: -z, z: -y })),
//         orientation.map(({ x, y, z }) => ({ x: -z, y: x, z: -y })),

//         orientation.map(({ x, y, z }) => ({ x: z, y, z: -x })),
//         orientation.map(({ x, y, z }) => ({ x: y, y: -z, z: -x })),
//         orientation.map(({ x, y, z }) => ({ x: -z, y: -y, z: -x })),
//         orientation.map(({ x, y, z }) => ({ x: -y, y: z, z: -x })),
//     ];
// };

const calculateOrientations = (orientation) => {
    return [
        orientation,
        orientation.map(({ x, y, z }) => `${y},${-x},${z}`),
        orientation.map(({ x, y, z }) => `${-x},${-y},${z}`),
        orientation.map(({ x, y, z }) => `${-y},${x},${z}`),

        orientation.map(({ x, y, z }) => `${-z},${-x},${y}`),
        orientation.map(({ x, y, z }) => `${-x},${z},${y}`),
        orientation.map(({ x, y, z }) => `${z},${x},${y}`),
        orientation.map(({ x, y, z }) => `${x},${-z},${y}`),

        orientation.map(({ x, y, z }) => `${-z},${y},${x}`),
        orientation.map(({ x, y, z }) => `${y},${z},${x}`),
        orientation.map(({ x, y, z }) => `${z},${-y},${x}`),
        orientation.map(({ x, y, z }) => `${-y},${-z},${x}`),

        orientation.map(({ x, y, z }) => `${-x},${y},${-z}`),
        orientation.map(({ x, y, z }) => `${y},${x},${-z}`),
        orientation.map(({ x, y, z }) => `${x},${-y},${-z}`),
        orientation.map(({ x, y, z }) => `${-y},${x},${-z}`),

        orientation.map(({ x, y, z }) => `${x},${z},${-y}`),
        orientation.map(({ x, y, z }) => `${z},${-x},${-y}`),
        orientation.map(({ x, y, z }) => `${-x},${-z},${-y}`),
        orientation.map(({ x, y, z }) => `${-z},${x},${-y}`),

        orientation.map(({ x, y, z }) => `${z},${y},${-x}`),
        orientation.map(({ x, y, z }) => `${y},${-z},${-x}`),
        orientation.map(({ x, y, z }) => `${-z},${-y},${-x}`),
        orientation.map(({ x, y, z }) => `${-y},${z},${-x}`),
    ];
};

const calculateDistancesBetweenBeacons = (beacons) => {
    const distances = [];
    for (let i = 0; i < beacons.length; i++) {
        for (let j = 0; j < beacons.length; j++) {
            if (i === j) continue;
            const beacon1 = beacons[i];
            const beacon2 = beacons[j];
            distances.push({
                x: beacon2.x - beacon1.x,
                y: beacon2.y - beacon1.y,
                z: beacon2.z - beacon1.z,
            });
        }
    }
    return distances;
};

const distancesForAllOrientations = dataset
    .map((scanner) => calculateDistancesBetweenBeacons(scanner))
    .map((distances) => calculateOrientations(distances));

for (const orientation of distancesForAllOrientations[2]) {
    for (const orientation2 of distancesForAllOrientations[3]) {
        const intersectingDistances = intersect(orientation2, orientation);
        if (intersectingDistances.length) {
            console.log("🙀", intersectingDistances.length);
        }
    }
}

// console.log(
//     "👳‍♀️",
//     dataset.map((scanner) => ({ orientations: calculateOrientations(scanner) }))
// );
