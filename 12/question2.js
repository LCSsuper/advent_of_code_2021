const fs = require("fs");

const dataset = fs
    .readFileSync("./dataset.txt")
    .toString()
    .split("\n")
    .map((row) => row.split("-"));

const addPathToCave = (map, from, to) => {
    if (to === "start" || from === "end") return;
    if (!map[from]) map[from] = [to];
    if (map[from] && !map[from].includes(to)) map[from].push(to);
};

const caveMap = dataset.reduce((map, [caveA, caveB]) => {
    addPathToCave(map, caveA, caveB);
    addPathToCave(map, caveB, caveA);
    return map;
}, {});

const routeHasVisitedASmallCave = (route) => {
    const smallVisitedCaves = route.filter(
        (cave) => cave.toLowerCase() === cave
    );
    smallVisitedCaves.sort();
    for (let i = 0; i < smallVisitedCaves.length; i++) {
        if (smallVisitedCaves[i] === smallVisitedCaves[i + 1]) return true;
    }
    return false;
};

const routes = [];

const walkRoute = (route) => {
    const currentLocation = route[route.length - 1];
    if (currentLocation === "end") {
        routes.push(route);
        return;
    }
    const paths = caveMap[currentLocation];
    for (const path of paths) {
        if (
            route.includes(path) &&
            path.toLowerCase() === path &&
            routeHasVisitedASmallCave(route)
        ) {
            continue;
        }
        walkRoute([...route, path]);
    }
};

walkRoute(["start"]);

console.log("👨‍❤️‍💋‍👨", routes.length);
