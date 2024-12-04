const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const land = input.map((x) => x.split(" ").map(Number));

const sum = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    sum[i][j] = sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1] + land[i - 1][j - 1];
  }
}

let answer = -Infinity;

for (let n = 1; n <= N; n++) {
  for (let i = 1; i <= N - n + 1; i++) {
    for (let j = 1; j <= N - n + 1; j++) {
      const res = sum[i + n - 1][j + n - 1] - sum[i + n - 1][j - 1] - sum[i - 1][j + n - 1] + sum[i - 1][j - 1];
      answer = Math.max(answer, res);
    }
  }
}

console.log(answer);
