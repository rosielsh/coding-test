const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, Q] = input.shift().split(" ").map(Number);
const edge = input.splice(0, N - 1).map((x) => x.split(" ").map(Number));
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < N - 1; i++) {
  const [p, q, r] = edge[i];
  graph[p].push([q, r]);
  graph[q].push([p, r]);
}

const bfs = (k, v) => {
  const queue = [[v, Number.MAX_SAFE_INTEGER]];
  const visited = Array.from({ length: N + 1 }, () => false);
  visited[v] = true;

  let cnt = 0; // 방문하는 정점 개수
  while (queue.length) {
    const [cv, cu] = queue.shift();

    for (let i = 0; i < graph[cv].length; i++) {
      const [nv, nu] = graph[cv][i];

      let mu = Math.min(nu, cu);

      if (visited[nv] || mu < k) continue;

      cnt++;
      visited[nv] = true;
      queue.push([nv, mu]);
    }
  }

  return cnt;
};

// 매 질문마다 반복
for (let i = 0; i < Q; i++) {
  // K : 기준 유사도, V : 확인할 정점
  const [k, v] = input[i].split(" ").map(Number);
  const res = bfs(k, v);

  console.log(res);
}
