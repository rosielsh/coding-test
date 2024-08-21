const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [V, E] = input.shift().split(" ").map(Number);
const edges = input.map((x) => x.split(" ").map(Number));

const graph = Array.from({ length: V + 1 }, () => []);

for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
}

let answer = false;
let visitAll = true;
const visited = Array.from({ length: V + 1 }, () => false);

const dfs = (x) => {
    for (let next of graph[x]) {
        if (visited[next]) continue;
        visited[next] = true;
        dfs(next);
    }
};

visited[1] = true;
dfs(1);

for (let i = 1; i <= V; i++) {
    if (!visited[i]) {
        visitAll = false;
        break;
    }
}

let oddCnt = 0;
let evenCnt = 0;

if (visitAll) {
    for (let nodes of graph) {
        if (nodes.length % 2 === 1) oddCnt += 1;
        else evenCnt += 1;
    }

    if (evenCnt === V || oddCnt === 0 || oddCnt == 2) {
        answer = true;
    }
}

console.log(answer ? "YES" : "NO");
