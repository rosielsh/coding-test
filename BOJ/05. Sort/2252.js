// 줄 세우기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const indegree = Array.from({ length: N + 1 }, () => 0);
input.forEach((x) => {
  [a, b] = x.split(" ").map(Number);
  graph[a].push(b);
  indegree[b] += 1;
});

const queue = [];
for (let i = 1; i <= N; i++) {
  if (indegree[i] === 0) queue.push(i);
}

function solution() {
  let answer = [];
  let curNode;
  while (queue.length) {
    curNode = queue.shift();
    answer.push(curNode);
    graph[curNode].forEach((x) => {
      indegree[x] -= 1;
      if (!indegree[x]) queue.push(x);
    });
  }

  return answer.join(" ");
}

console.log(solution());
