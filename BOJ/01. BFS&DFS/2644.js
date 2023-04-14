// 촌수 계산

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[n, two, m, ...edges] = require("fs").readFileSync(filePath).toString().trim().split("\n");
n = +n;
[from, to] = two.split(" ").map(Number);
m = +m;

const graph = Array.from({ length: n + 1 }, () => []);
for (let i = 0; i < m; i++) {
  [a, b] = edges[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

function solution(startNode) {
  const needVisit = [[startNode, 0]];
  const visited = Array.from({ length: n + 1 }, () => 0);

  while (needVisit.length) {
    [curNode, degree] = needVisit.shift();

    if (curNode === to) {
      return degree;
    }

    for (let i = 0; i < graph[curNode].length; i++) {
      if (visited[graph[curNode][i]]) continue;
      visited[graph[curNode][i]] = 1;
      needVisit.push([graph[curNode][i], degree + 1]);
    }
  }
  return -1;
}

console.log(solution(from));
