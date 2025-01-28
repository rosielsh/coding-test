const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [D, P] = input[0].split(" ").map(Number);
const pipe = input.slice(1).map((x) => x.split(" ").map(Number));

const dp = Array.from({ length: D + 1 }, () => 0);
dp[0] = Infinity;

for (let i = 0; i < P; i++) {
  const [l, c] = pipe[i];

  for (let j = D; j >= l; j--) {
    if (j - l >= 0) {
      dp[j] = Math.max(dp[j], Math.min(dp[j - l], c));
    }
  }
}

console.log(dp[D]);
