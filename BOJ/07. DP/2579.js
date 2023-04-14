// 계단 오르기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...stairs] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
stairs = stairs.map(Number);

const dp = Array.from({ length: N + 1 }, () => 0);

function solution() {
  dp[1] = stairs[0];
  dp[2] = stairs[0] + stairs[1];
  dp[3] = Math.max(stairs[0], stairs[1]) + stairs[2];

  for (let i = 4; i <= N; i++) {
    dp[i] = Math.max(dp[i - 2], dp[i - 3] + stairs[i - 2]) + stairs[i - 1];
  }
  return dp[N];
}

console.log(solution());
