// 작업 -> 실패

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const graph = Array.from({ length: N + 1 }, () => []);
const time = Array.from({ length: N + 1 }, () => 0);

for (let i = 0; i < N; i++) {
  const data = input[i].split(" ").map(Number);
  time[i + 1] = data.shift();
  data.shift();
  graph[i + 1].push(...data);
}

console.log(graph);

function solution() {
  let answer = Array.from({ length: N + 1 }, () => 0);
  answer[1] = time[1];
  for (let i = 2; i <= N; i++) {
    let nodes = graph[i];
    for (let j = 0; j < nodes.length; j++) {
      console.log(i, time[i], time[nodes[j]], nodes[j]);
      answer[i] = Math.max(answer[i], time[i] + time[nodes[j]]);
    }
  }
  return answer;
}

console.log(solution());
