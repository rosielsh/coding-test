// 이분 그래프

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [T, ...input] = require("fs").readFileSync(filePath).toString().trim().split("\n");

let V;
let E;
const rValue = Array.from({ length: V + 1 }, () => -1);
let graph;
let visited;

function dfs(start, value) {
  const stack = [[start]];
  rValue[start] = value;
  visited[start] = 1;

  while (stack.length) {
    const curNode = stack.pop();

    for (let i = 0; i < graph[curNode].length; i++) {
      const nextNode = graph[curNode][i];
      // 방문한 적이 있을 때 -> 그 값의 대표값 확인
      if (visited[nextNode]) {
        if (rValue[curNode] === rValue[nextNode]) return false;
      } else {
        visited[nextNode] = 1;
        rValue[nextNode] = rValue[curNode] === 1 ? 0 : 1; // 현재 대표값과 다른값 저장
        stack.push([nextNode]);
      }
    }
  }
  return true;
}

function solution() {
  let answer = [];

  for (let i = 0; i < T; i++) {
    [V, E] = input.shift().split(" ").map(Number);
    const edges = input.splice(0, E).map((x) => x.split(" ").map(Number));
    graph = Array.from({ length: V + 1 }, () => []);

    edges.forEach((edge) => {
      graph[edge[0]].push(edge[1]);
      graph[edge[1]].push(edge[0]);
    });

    visited = Array.from({ length: V + 1 }, () => 0);

    let isBinaryGraph = true;
    for (let i = 1; i <= V; i++) {
      if (visited[i]) continue;
      if (!dfs(i, 0)) isBinaryGraph = false;
    }
    answer.push(isBinaryGraph === true ? "YES" : "NO");
  }

  return answer.join("\n");
}

console.log(solution());
