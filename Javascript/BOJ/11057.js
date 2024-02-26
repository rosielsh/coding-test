const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();

// 오르막 수의 개수
const dp = Array.from({ length: N + 1 }, () => Array(10).fill(0));

for (let i = 0; i <= 9; i++) {
    dp[1][i] = 1;
}

for (let i = 2; i <= N; i++) {
    dp[i][0] = 1;
    for (let j = 1; j <= 9; j++) {
        dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 10007;
    }
}

let answer = 0;
for (let i = 0; i <= 9; i++) {
    answer += dp[N][i] % 10007;
}

console.log(answer % 10007);
