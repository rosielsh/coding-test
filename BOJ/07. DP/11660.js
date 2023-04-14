// 구간 합 구하기 4

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const num = input.shift().split(" ").map(Number);
const pos = input.map((x) => x.split(" ").map(Number));
const sum = [0];
for (let i = 1; i <= N; i++) {
  sum[i] = sum[i - 1] + num[i - 1];
}

function solution() {
  let answer = [];
  for (let i = 0; i < M; i++) {
    answer.push(sum[pos[i][1]] - sum[pos[i][0] - 1]);
  }
  return answer.join("\n");
}

console.log(solution());
