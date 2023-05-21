// 행렬 덧셈

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const A = input.splice(0, N).map((x) => x.split(" ").map(Number));
const B = input.splice(0, N).map((x) => x.split(" ").map(Number));

function solution() {
  const sum = Array.from({ length: N }, () => Array(M).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      sum[i][j] = A[i][j] + B[i][j];
    }
  }

  return sum.map((x) => x.join(" ")).join("\n");
}

console.log(solution());
