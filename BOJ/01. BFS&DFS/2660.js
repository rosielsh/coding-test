// 회장뽑기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N, ...edges] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
edges = edges.splice(0, edges.length - 1).map((x) => x.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

edges.forEach(([from, to]) => {
  graph[from].push(to);
  graph[to].push(from);
});

function bfs(x) {
  const queue = [[x, 0]];
  const visited = Array.from({ length: N + 1 }, () => 0);
  visited[x] = 1;

  let maxDepth = 0;

  while (queue.length) {
    const [curNode, depth] = queue.shift();

    maxDepth = Math.max(maxDepth, depth);

    if (!graph[curNode].length) continue;

    for (let i = 0; i < graph[curNode].length; i++) {
      const nextNode = graph[curNode][i];

      if (visited[nextNode]) continue;

      visited[nextNode] = 1;
      queue.push([nextNode, depth + 1]);
    }
  }

  return maxDepth;
}

function solution() {
  let answer = "";

  // 현재 회원 번호, depth 저장
  let minDepth = [];
  for (let i = 1; i <= N; i++) {
    const depth = bfs(i);
    if (!minDepth.length) {
      minDepth = [[i, depth]];
    } else if (minDepth[minDepth.length - 1][1] === depth) {
      minDepth.push([i, depth]);
    } else if (minDepth[minDepth.length - 1][1] > depth) {
      minDepth = [[i, depth]];
    }
  }

  answer += `${minDepth[0][1]} ${minDepth.length}\n`;
  minDepth.forEach(([node, _]) => {
    answer += `${node} `;
  });

  return answer;
}

console.log(solution());
