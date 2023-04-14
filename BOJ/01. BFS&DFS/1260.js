// DFS와 BFS

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M, V] = input
  .shift()
  .split(" ")
  .map((x) => +x);
const g = {};
for (let i = 0; i < N; i++) {
  g[i + 1] = [];
}

for (let i = 0; i < M; i++) {
  const [a, b] = input[i].replace("\r", "").split(" ");
  g[a].push(+b);
  g[b].push(+a);
}

const BFS = (graph, startNode) => {
  const visited = [];
  const needVisit = [startNode];

  for (let i = 0; i < N; i++) {
    graph[i + 1].sort((a, b) => a - b);
  }

  while (needVisit.length !== 0) {
    const node = needVisit.shift();

    if (!visited.includes(node)) {
      visited.push(node);
      needVisit.push(...graph[node]);
    }
  }
  console.log(visited.join(" "));
};

const DFS = (graph, startNode) => {
  const visited = [];
  const needVisit = [startNode];

  for (let i = 0; i < N; i++) {
    graph[i + 1].sort((a, b) => a - b);
  }

  while (needVisit.length !== 0) {
    const node = needVisit.pop();

    if (!visited.includes(node)) {
      visited.push(node);
      needVisit.push(...graph[node].reverse());
    }
  }
  console.log(visited.join(" "));
};

DFS(g, V);
BFS(g, V);
