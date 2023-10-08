const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().replace(/\r/g, "").trim().split(" ");

const N = +input[0];
const K = +input[1];

const dp = Array.from({ length: K + 1 }, () => Array(N + 1));

for (let i = 0; i <= N; i++) {
  dp[0][i] = 0;
  dp[1][i] = 1;
}

for (let i = 2; i <= K; i++) {
  dp[i][0] = 1;
  for (let j = 1; j <= N; j++) {
    dp[i][j] = (dp[i][j - 1] + dp[i - 1][j]) % 1000000000;
  }
}

console.log(dp[K][N] % 1000000000);
