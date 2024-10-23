const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const value = input.map((x) => x.split(" ").map(Number));

const dp = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(3).fill(Infinity))
);

for (let i = 0; i < M; i++) {
    for (let j = 0; j < 3; j++) {
        dp[0][i][j] = value[0][i];
    }
}

for (let i = 1; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (j === 0) {
            dp[i][j][0] = 0;
            dp[i][j][1] = dp[i - 1][j][2] + value[i][j];
            dp[i][j][2] = Math.min(dp[i - 1][j + 1][0], dp[i - 1][j + 1][1]) + value[i][j];
        } else if (j === M - 1) {
            dp[i][j][0] = Math.min(dp[i - 1][j - 1][1], dp[i - 1][j - 1][2]) + value[i][j];
            dp[i][j][1] = dp[i - 1][j][0] + value[i][j];
            dp[i][j][2] = 0;
        } else {
            dp[i][j][0] = Math.min(dp[i - 1][j - 1][1], dp[i - 1][j - 1][2]) + value[i][j];
            dp[i][j][1] = Math.min(dp[i - 1][j][0], dp[i - 1][j][2]) + value[i][j];
            dp[i][j][2] = Math.min(dp[i - 1][j + 1][0], dp[i - 1][j + 1][1]) + value[i][j];
        }
    }
}

let answer = Number.MAX_SAFE_INTEGER;

for (let j = 0; j < M; j++) {
    for (k = 0; k < 3; k++) {
        if (dp[N - 1][j][k] === 0) continue;
        answer = Math.min(answer, dp[N - 1][j][k]);
    }
}

console.log(answer);
