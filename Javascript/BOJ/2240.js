const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [T, W] = input.shift().split(" ").map(Number);
const list = input.map(Number);

const dp = Array.from({ length: W + 1 }, () =>
  Array.from({ length: T + 1 }, () => Array(2).fill(0))
);

for (let w = 0; w <= W; w++) {
  for (let t = 1; t <= T; t++) {
    if (w === 0) {
      dp[w][t][0] = dp[w][t - 1][0] + (list[t - 1] === 1 ? 1 : 0);
    } else {
      dp[w][t][0] = Math.max(
        dp[w - 1][t - 1][1] + (list[t - 1] === 1 ? 1 : 0),
        dp[w][t - 1][0] + (list[t - 1] === 1 ? 1 : 0)
      );
      dp[w][t][1] = Math.max(
        dp[w - 1][t - 1][0] + (list[t - 1] === 2 ? 1 : 0),
        dp[w][t - 1][1] + (list[t - 1] === 2 ? 1 : 0)
      );
    }
  }
}

let maxValue = -1;
for (let i = 0; i <= W; i++) {
  for (let j = 0; j <= 1; j++) {
    maxValue = Math.max(maxValue, dp[i][T][j]);
  }
}

console.log(maxValue);
