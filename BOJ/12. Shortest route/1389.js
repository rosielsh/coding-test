// 케빈 베이컨의 6단계 법칙

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split(" ").map(Number));
[N, M] = input[0];
edges = input.slice(1, M + 1);

const matrix = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));
for (let i = 1; i <= N; i++) {
  matrix[i][i] = 0;
}

for (let i = 0; i < M; i++) {
  [a, b] = edges[i];
  matrix[a][b] = 1;
  matrix[b][a] = 1;
}

function solution() {
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if (matrix[i][k] + matrix[k][j] < matrix[i][j]) matrix[i][j] = matrix[i][k] + matrix[k][j];
      }
    }
  }

  const sum = [];
  for (let i = 1; i <= N; i++) {
    sum[i - 1] = matrix[i].slice(1).reduce((acc, cur) => acc + cur, 0);
  }

  return sum.indexOf(Math.min(...sum)) + 1;
}

console.log(solution());
