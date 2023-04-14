// 외판원 순회 2

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...costs] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
costs = costs.map((x) => x.split(" ").map(Number));

let visited = Array.from({ length: N }, () => 0);
let minCost = Number.MAX_SAFE_INTEGER;

function dfs(curNode, start, sum, len) {
  if (len === N && curNode === start) {
    minCost = Math.min(minCost, sum + costs[curNode][start]);
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!costs[curNode][i] || visited[i]) continue;
    visited[i] = 1;
    dfs(i, start, sum + costs[curNode][i], len + 1);
    visited[i] = 0;
  }
}

function solution() {
  dfs(0, 0, 0, 0);
  return minCost;
}

console.log(solution());
