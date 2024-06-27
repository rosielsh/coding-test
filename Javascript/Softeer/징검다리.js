const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const N = +input.shift();
const A = input.shift().split(" ").map(Number);
A.unshift(0);

const dp = Array.from({ length: N }, () => 0);

for (let i = 1; i <= N; i++) {
    dp[i] = 1;
    for (let j = 1; j < i; j++) {
        // 돌의 높이가 j가 더 작으면
        if (A[i] > A[j]) {
            dp[i] = Math.max(dp[i], dp[j] + 1);
        }
    }
}

console.log(Math.max(...dp));
