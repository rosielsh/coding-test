const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const score = input.map((x) => x.split(" ").map(Number));
score.unshift([]);

const N = score.length;

const dp = [];

for (let i = 0; i <= N; i++) {
    dp[i] = Array.from({ length: 16 }, () => new Array(16).fill(0));
}

let answer = 0;

for (let i = 1; i < N; i++) {
    for (let b = 0; b <= 15; b++) {
        for (let w = 0; w <= 15; w++) {
            const white = w > 0 ? dp[i - 1][b][w - 1] + score[i][0] : 0;
            const black = b > 0 ? dp[i - 1][b - 1][w] + score[i][1] : 0;
            dp[i][b][w] = Math.max(dp[i - 1][b][w], Math.max(white, black));

            if (b === 15 && w === 15) {
                answer = Math.max(answer, dp[i][b][w]);
            }
        }
    }
}

console.log(answer);
