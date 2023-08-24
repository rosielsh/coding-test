// 구슬 찾기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [NM, ...edges] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = NM.split(" ").map(Number);
edges = edges.map((x) => x.split(" ").map(Number));

const graphToHeavy = Array.from({ length: N + 1 }, () => []);
const graphToLight = Array.from({ length: N + 1 }, () => []);

edges.forEach(([heavy, light]) => {
  graphToLight[heavy].push(light);
  graphToHeavy[light].push(heavy);
});

function bfs(graph, x) {
  const queue = [x];
  const visited = Array.from({ length: N + 1 }, () => 0);
  visited[x] = 1;
  let cnt = 0;

  while (queue.length) {
    const curNode = queue.shift();

    if (!graph[curNode].length) continue;

    for (let i = 0; i < graph[curNode].length; i++) {
      const nextNode = graph[curNode][i];

      if (visited[nextNode]) continue;

      visited[nextNode] = 1;
      cnt++;
      queue.push(nextNode);
    }
  }

  return cnt;
}

function solution() {
  let answer = 0;
  for (let i = 1; i <= N; i++) {
    const heavyCnt = bfs(graphToHeavy, i);
    const lightCnt = bfs(graphToLight, i);
    if (heavyCnt >= (N + 1) / 2 || lightCnt >= (N + 1) / 2) answer++;
  }
  return answer;
}

console.log(solution());
