// ACM Craft

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
let T = +input.shift();
let graph;
let queue = [];
let indegree = [];
let totalTime = [];

function solution() {
  let i = 0;
  let curNode;
  while (T > 0) {
    queue = [];
    answer = 0;
    [N, K] = input[i].split(" ").map(Number);
    time = input[i + 1].split(" ").map(Number);
    order = input.slice(i + 2, i + K + 2).map((x) => x.split(" ").map(Number));
    W = +input[i + K + 2];

    graph = Array.from({ length: N + 1 }, () => []);
    indegree = Array.from({ length: N + 1 }, () => 0);
    order.forEach((x) => {
      graph[x[0]].push(x[1]);
      indegree[x[1]] += 1;
    });
    totalTime = [...time];

    indegree.forEach((x, idx) => {
      if (idx !== 0 && x === 0) queue.push(idx);
    });

    while (queue.length) {
      curNode = queue.shift();
      if (curNode === W) break;
      graph[curNode].forEach((x) => {
        indegree[x] -= 1;
        totalTime[x - 1] = Math.max(totalTime[x - 1], totalTime[curNode - 1] + time[x - 1]);
        if (indegree[x] === 0) queue.push(x);
      });
    }
    T--;
    i += K + 3;
    console.log(totalTime[W - 1]);
  }
}

solution();
