// RGB 거리

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const rgb = input.map((x) => x.split(" ").map(Number));
const dp = Array.from({ length: N + 1 }, () => Array(3).fill(0));

function solution() {
  dp[1] = rgb[0];
  for (let i = 2; i <= N; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + rgb[i - 1][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + rgb[i - 1][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + rgb[i - 1][2];
  }
  return Math.min(...dp[N]);
}

console.log(solution());
