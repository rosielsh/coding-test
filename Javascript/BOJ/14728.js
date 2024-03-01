const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 단원 개수 N, 공부할 수 있는 총 시간 T
// 각 단원별 예상 공부 시간 K, 단원 문제의 배점 S

const [N, T] = input.shift().split(" ").map(Number);
const chapter = input.map((x) => x.split(" ").map(Number));

// 각 단원 문제의 예상 공부 시간만큼 공부하면 그 문제를 맞을 수 있음
// T 시간동안 공부해서 얻을 수 있는 최대 점수를 구하기

const dp = Array.from({ length: N + 1 }, () => Array(T + 1).fill(0));

for (let i = 1; i <= N; i++) {
    const [time, score] = chapter[i - 1];
    dp[i][time] = score;
    for (let j = 1; j <= T; j++) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j]);
        if (j - time >= 1) {
            dp[i][j] = Math.max(dp[i - 1][j - time] + score, dp[i][j]);
        }
    }
}

console.log(dp[N][T]);
