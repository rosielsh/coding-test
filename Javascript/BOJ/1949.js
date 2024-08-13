const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const nums = input.shift().split(" ").map(Number);
const edge = input.map((x) => x.split(" ").map(Number));
const visited = Array.from({ length: N + 1 }, () => false);
const dp = Array.from({ length: N + 1 }, () => Array(2).fill(0));
const graph = Array.from({ length: N + 1 }, () => []);

for (let [a, b] of edge) {
    graph[a].push(b);
    graph[b].push(a);
}

const dfs = (x) => {
    if (visited[x]) return dp[x];
    visited[x] = true;

    dp[x][0] = 0;
    dp[x][1] = nums[x - 1];

    for (let node of graph[x]) {
        if (visited[node]) continue;

        const val = dfs(node);

        dp[x][0] += Math.max(val[0], val[1]);
        dp[x][1] += val[0];
    }

    return dp[x];
};

dfs(1);

console.log(Math.max(...dp[1]));
