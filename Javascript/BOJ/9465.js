const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const answer = [];
const T = +input[0];

let idx = 1;
for (let t = 0; t < T; t++) {
    const n = +input[idx++];
    const sticker = input.slice(idx, idx + 2).map((x) => x.split(" ").map(Number));
    idx += 2;

    const dp = Array.from({ length: n + 1 }, () => Array(2).fill(0));

    dp[1][0] = sticker[0][0];
    dp[1][1] = sticker[1][0];

    for (let i = 2; i <= n; i++) {
        dp[i][0] = Math.max(dp[i - 2][0], dp[i - 2][1], dp[i - 1][1]) + sticker[0][i - 1];
        dp[i][1] = Math.max(dp[i - 2][0], dp[i - 2][1], dp[i - 1][0]) + sticker[1][i - 1];
    }

    answer.push(Math.max(...dp[n]));
}

console.log(answer.join("\n"));
