const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const nums = input.shift().split(" ").map(Number);

const dp = Array.from({ length: N }, () => Array(21).fill(BigInt(0)));

dp[0][nums[0]] = BigInt(1);

for (let i = 1; i < N - 1; i++) {
    for (let j = 0; j <= 20; j++) {
        if (dp[i - 1][j] > 0) {
            const curNum = nums[i];
            if (j - curNum >= 0) {
                dp[i][j - curNum] += dp[i - 1][j];
            }

            if (j + curNum <= 20) {
                dp[i][j + curNum] += dp[i - 1][j];
            }
        }
    }
}

console.log(dp[N - 2][nums[N - 1]].toString());
