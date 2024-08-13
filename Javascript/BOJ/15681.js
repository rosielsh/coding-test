const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, R, Q] = input.shift().split(" ").map(Number);
const edge = input.splice(0, N - 1).map((x) => x.split(" ").map(Number));
const roots = input.map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N + 1 }, () => false);
const dp = Array.from({ length: N + 1 }, () => 0);

for (let [a, b] of edge) {
    graph[a].push(b);
    graph[b].push(a);
}

const dfs = (x) => {
    if (visited[x]) return dp[x];
    visited[x] = true;

    dp[x] = 1;

    for (let node of graph[x]) {
        if (visited[node]) continue;

        const val = dfs(node);
        dp[x] += val;
    }

    return dp[x];
};

dfs(R);

const answer = [];

for (let r of roots) {
    answer.push(dp[r]);
}

console.log(answer.join("\n"));
