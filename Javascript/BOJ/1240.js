const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const edge = input.splice(0, N - 1).map((x) => x.split(" ").map(Number));
const nodes = input.map((x) => x.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

for (let [a, b, d] of edge) {
  graph[a].push([b, d]);
  graph[b].push([a, d]);
}

const dist = Array.from({ length: N + 1 }, () => Array(N + 1).fill(-1));

const bfs = (x) => {
  const visited = Array.from({ length: N + 1 }, () => false);
  visited[x] = true;

  const queue = [[x, 0]];

  while (queue.length > 0) {
    const [cx, cd] = queue.shift();

    for (let [nx, nd] of graph[cx]) {
      if (visited[nx]) continue;

      visited[nx] = true;
      dist[x][nx] = cd + nd;
      dist[nx][x] = cd + nd;
      queue.push([nx, cd + nd]);
    }
  }
};

for (let i = 1; i <= N; i++) {
  bfs(i);
}

const answer = [];

for (let [a, b] of nodes) {
  answer.push(dist[a][b]);
}

console.log(answer.join("\n"));
