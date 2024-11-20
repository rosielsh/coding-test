const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [T, W] = input.shift().split(" ").map(Number);
const tree = input.map(Number);

const dp = Array.from({ length: W + 1 }, () => Array.from({ length: T + 1 }, () => Array(2).fill(0)));

for (let i = 0; i <= W; i++) {
  for (let j = 1; j <= T; j++) {
    for (let k = 0; k < 2; k++) {
      if (i === 0) {
        dp[i][j][0] = dp[i][j - 1][0] + (tree[j - 1] === 1 ? 1 : 0);
      } else {
        if (k === 0) {
          dp[i][j][k] = Math.max(dp[i][j][k], dp[i - 1][j - 1][1], dp[i][j - 1][0]) + (tree[j - 1] === 1 ? 1 : 0);
        } else {
          dp[i][j][k] = Math.max(dp[i][j][k], dp[i - 1][j - 1][0], dp[i][j - 1][1]) + (tree[j - 1] === 2 ? 1 : 0);
        }
      }
    }
  }
}

console.log(Math.max(...dp[W][T]));
