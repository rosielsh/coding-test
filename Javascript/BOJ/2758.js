const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const T = +input.shift();
const tc = input.map((x) => x.split(" ").map(Number));

let maxN = 0;
let maxM = 0;

for (let [n, m] of tc) {
    maxN = Math.max(maxN, n);
    maxM = Math.max(maxM, m);
}

const dp = Array.from({ length: maxN + 1 }, () => Array(maxM + 1).fill(0));

for (let i = 1; i <= maxM; i++) {
    dp[1][i] = i;
}

for (let i = 2; i <= maxN; i++) {
    for (let j = 1; j <= maxM; j++) {
        dp[i][j] = dp[i][j - 1] + dp[i - 1][parseInt(j / 2)];
    }
}

const answer = [];

for (let [n, m] of tc) {
    answer.push(dp[n][m]);
}

console.log(answer.join("\n"));
