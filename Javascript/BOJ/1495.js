const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, S, M] = input[0].split(" ").map(Number);
const V = input[1].split(" ").map(Number);

const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
dp[0][S] = 1;

for (let i = 1; i <= N; i++) {
  for (let j = 0; j <= M; j++) {
    if (dp[i - 1][j] === 1) {
      if (j - V[i - 1] >= 0 && j - V[i - 1] <= M) {
        dp[i][j - V[i - 1]] = 1;
      }

      if (j + V[i - 1] >= 0 && j + V[i - 1] <= M) {
        dp[i][j + V[i - 1]] = 1;
      }
    }
  }
}

let answer = -1;
for (let i = M; i >= 0; i--) {
  if (dp[N][i]) {
    answer = i;
    break;
  }
}

console.log(answer);
