const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [n, k] = input.shift().split(" ").map(Number);
const coin = input.map(Number);

const dp = Array.from({ length: k + 1 }, () => Infinity);

for (let c of coin) {
    dp[c] = 1;
}

for (let i = 1; i <= k; i++) {
    for (let j = 0; j < n; j++) {
        if (i - coin[j] < 0) continue;

        dp[i] = Math.min(dp[i], dp[i - coin[j]] + 1);
    }
}

console.log(dp[k] === Infinity ? -1 : dp[k]);
