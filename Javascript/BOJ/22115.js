const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const caffeine = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const dp = Array.from({ length: N }, () => Array(K + 1).fill(Infinity));

for (let i = 0; i < N; i++) {
  dp[i][0] = 0;
}

dp[0][caffeine[0]] = 1;

let sum = caffeine[0];
for (let i = 1; i < N; i++) {
  sum += caffeine[i];

  for (let j = 1; j <= K; j++) {
    if (sum < j) continue;

    dp[i][j] = Math.min(dp[i][j], dp[i - 1][j]);

    if (j - caffeine[i] >= 0) {
      dp[i][j] = Math.min(dp[i][j], dp[i - 1][j - caffeine[i]] + 1);
    }
  }
}

console.log(dp[N - 1][K] === Infinity ? -1 : dp[N - 1][K]);
