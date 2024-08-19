const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, R] = input.shift().split(" ").map(Number);
const edge = input.map((x) => x.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N + 1 }, () => false);

for (let [a, b, d] of edge) {
    graph[a].push([b, d]);
    graph[b].push([a, d]);
}

let maxBranch = -1;
let pillar = 0;
let isFindGiga = false;

const dfs = (x, w) => {
    maxBranch = Math.max(maxBranch, w);

    if (!isFindGiga) {
        if ((x === R && graph[x].length > 1) || (x !== R && graph[x].length > 2)) {
            pillar = w;
            isFindGiga = true;
        }
    }

    for (let [next, weight] of graph[x]) {
        if (visited[next]) continue;
        visited[x] = true;
        dfs(next, w + weight);
    }
};

visited[R] = true;
dfs(R, 0);

if (isFindGiga) {
    console.log(pillar, maxBranch - pillar);
} else {
    console.log(maxBranch, 0);
}
