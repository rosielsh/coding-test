const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const S = input.shift().split(" ").map(Number);

const dp = Array.from({ length: N + 1 }, () => Infinity);

const combi = [...S];

for (let i = 0; i < M; i++) {
    for (let j = i + 1; j < M; j++) {
        combi.push(S[i] + S[j]);
    }
}

dp[0] = 0;

for (let i = 1; i <= N; i++) {
    for (let cnt of combi) {
        if (i - cnt < 0) continue;
        dp[i] = Math.min(dp[i], dp[i - cnt] + 1);
    }
}

console.log(dp[N] === Infinity ? -1 : dp[N]);
