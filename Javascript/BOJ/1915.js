const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const dp = input.map((x) => x.split("").map(Number));

let maxValue = 0;

for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
        if (dp[i][j] > 0) {
            dp[i][j] += Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
        }
    }
}

for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
        maxValue = Math.max(maxValue, dp[i][j]);
    }
}

console.log(maxValue * maxValue);
