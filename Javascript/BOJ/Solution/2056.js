// 작업

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N, ...input] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;

function solution() {
  let answer;

  const graph = Array.from({ length: N + 1 }, () => []);
  const indegree = Array.from({ length: N + 1 }, () => 0);
  const duringTime = Array.from({ length: N + 1 }, () => 0);

  input.forEach((arr, idx) => {
    const [time, preWorkCnt, ...preWorks] = arr.split(" ").map(Number);

    indegree[idx + 1] = preWorkCnt;
    duringTime[idx + 1] = time;

    preWorks.forEach((work) => {
      graph[work].push(idx + 1);
    });
  });

  const queue = [];

  const dp = Array.from({ length: N + 1 }, () => 0);
  for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0) {
      queue.push([i, duringTime[i]]);
      dp[i] = duringTime[i];
    }
  }

  while (queue.length) {
    const [curNode, sumTime] = queue.shift();

    graph[curNode].forEach((nextNode) => {
      indegree[nextNode]--;

      // 다음 방문할 노드에 대해서 최댓값을 항상 갱신해줘야 한다.
      dp[nextNode] = Math.max(dp[curNode] + duringTime[nextNode], dp[nextNode]);
      if (indegree[nextNode] === 0) queue.push([nextNode, sumTime + duringTime[nextNode]]);
    });
  }
  answer = Math.max(...dp);
  return answer;
}

console.log(solution());
