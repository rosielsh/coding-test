const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const A = input[1].split(" ").map(Number);

const dp = Array.from({ length: N }, () => 0); // 각 자리의 수를 마지막으로 했을 때 증가하는 부분 수열의 길이

dp[0] = 1;
for (let i = 1; i < N; i++) {
    let max = 0;
    for (let j = i - 1; j >= 0; j--) {
        if (A[j] > A[i] && dp[j] > max) {
            max = dp[j];
        }
    }
    dp[i] = max + 1;
}

console.log(Math.max(...dp));
