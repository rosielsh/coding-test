// 환승

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [NKM, ...tubes] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, K, M] = NKM.split(" ").map(Number);
tubes = tubes.map((x) => x.split(" ").map(Number));

// 각 정점당 연결된 튜브 저장
const graph = Array.from({ length: N + 1 }, () => []);

tubes.forEach((edges, idx) => {
  edges.forEach((edge) => {
    if (!graph[edge].includes(idx + 1)) graph[edge].push(idx + 1);
  });
});

tubes.unshift([]);

function bfs() {
  const queue = [[1, 1]];
  const visited = Array.from({ length: N + 1 }, () => 0);
  const visitedTube = Array.from({ length: M + 1 }, () => 0);
  visited[1] = 1;

  while (queue.length) {
    const [curNode, dist] = queue.shift();

    if (curNode === N) return dist;

    for (let i = 0; i < graph[curNode].length; i++) {
      const curTube = graph[curNode][i];

      if (visitedTube[curTube]) continue;
      visitedTube[curTube] = 1;

      for (let j = 0; j < tubes[curTube].length; j++) {
        const nextTubNode = tubes[curTube][j];
        if (visited[nextTubNode]) continue;

        visited[nextTubNode] = 1;
        queue.push([nextTubNode, dist + 1]);
      }
    }
  }

  return -1;
}

function solution() {
  const dist = bfs();
  return dist;
}

console.log(solution());
