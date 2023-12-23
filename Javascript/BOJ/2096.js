const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const num = input.map((x) => x.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array(3).fill(0));

const pos = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
];

dp[0][0] = num[0][0];
dp[0][1] = num[0][1];
dp[0][2] = num[0][2];

for (let i = 1; i < N; i++) {
    for (let j = 0; j < 3; j++) {
        dp[i][j] = num[i][j];

        for (let [x, y] of pos) {
            const nx = x + i;
            const ny = y + j;

            if (ny < 0 || ny >= 3) continue;

            dp[i][j] = Math.max(dp[i][j], num[i][j] + dp[nx][ny]);
        }
    }
}

console.log(Math.max(...dp[N - 1]));
