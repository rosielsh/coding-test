const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const score = input.shift().split(" ").map(Number);
score.unshift(0);

const dp = Array.from({ length: N + 1 }, () => 0); // 1명 ~ N명까지 포함했을때의 조가 잘 짜여진 정도의 최댓값

for (let i = 1; i <= N; i++) {
    let max = Number.MIN_SAFE_INTEGER;
    let min = Number.MAX_SAFE_INTEGER;

    for (let j = i; j > 0; j--) {
        max = Math.max(max, score[j]);
        min = Math.min(min, score[j]);

        dp[i] = Math.max(dp[i], max - min + dp[j - 1]);
    }
}

console.log(dp[N]);
