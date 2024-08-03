const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const info = input.map((x) => x.split(" ").map(Number));

const dp = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => Array(3).fill(0))
);

for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= N; j++) {
        dp[i][j][0] = info[i - 1][j - 1] === 0 ? 1 : 0;

        for (let k = 0; k < 3; k++) {
            dp[i][j][k] = Math.max(dp[i][j][k], dp[i - 1][j][k], dp[i][j - 1][k]);

            if (info[i - 1][j - 1] === 0 && k === 0) {
                if (dp[i - 1][j][2] > 0) dp[i][j][k] = Math.max(dp[i][j][k], dp[i - 1][j][2] + 1);
                if (dp[i][j - 1][2] > 0) dp[i][j][k] = Math.max(dp[i][j][k], dp[i][j - 1][2] + 1);
            } else if (info[i - 1][j - 1] === 1 && k === 1) {
                if (dp[i - 1][j][0] > 0) dp[i][j][k] = Math.max(dp[i][j][k], dp[i - 1][j][0] + 1);
                if (dp[i][j - 1][0] > 0) dp[i][j][k] = Math.max(dp[i][j][k], dp[i][j - 1][0] + 1);
            } else if (info[i - 1][j - 1] === 2 && k === 2) {
                if (dp[i - 1][j][1] > 0) dp[i][j][k] = Math.max(dp[i][j][k], dp[i - 1][j][1] + 1);
                if (dp[i][j - 1][1] > 0) dp[i][j][k] = Math.max(dp[i][j][k], dp[i][j - 1][1] + 1);
            }
        }
    }
}

console.log(Math.max(...dp[N][N]));
