const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const graph = Array.from({ length: N + 1 }, () => []);
const parent = Array.from({ length: N + 1 }, () => 0);
const visited = Array.from({ length: N + 1 }, () => 0);

for (let i = 0; i < input.length; i++) {
  const [from, to] = input[i].split(" ").map(Number);
  graph[from].push(to);
  graph[to].push(from);
}

function dfs(x) {
  for (let i = 0; i < graph[x].length; i++) {
    const next = graph[x][i];
    if (visited[next]) continue;
    visited[next] = true;
    parent[next] = x;
    dfs(next);
  }
}

function solution() {
  let answer;
  visited[1] = true;
  dfs(1);

  answer = parent.slice(2).join("\n");
  return answer;
}

console.log(solution());
