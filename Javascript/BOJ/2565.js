const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const line = input
  .slice(1)
  .map((x) => x.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);

const dp = Array.from({ length: N }, () => 1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (line[j][1] < line[i][1]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

console.log(N - Math.max(...dp));
