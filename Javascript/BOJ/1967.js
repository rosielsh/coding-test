const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const n = input.shift();
const edges = input.map((x) => x.split(" ").map(Number));

const graph = Array.from({ length: n + 1 }, () => []);
let visited;

for (let [from, to, weight] of edges) {
    graph[from].push([to, weight]);
    graph[to].push([from, weight]);
}

let maxNode = 0;
let maxVal = 0;

const dfs = (x, sum) => {
    if (maxVal < sum) {
        maxVal = sum;
        maxNode = x;
    }

    for (let [next, nweight] of graph[x]) {
        if (visited[next]) continue;
        visited[next] = true;
        dfs(next, sum + nweight);
    }
};

visited = Array.from({ length: n + 1 }, () => false);
visited[1] = true;
dfs(1, 0);

visited = Array.from({ length: n + 1 }, () => false);
visited[maxNode] = true;
maxVal = 0;
dfs(maxNode, 0);

console.log(maxVal);
