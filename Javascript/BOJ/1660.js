const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];

const floorCnt = [1];

let plus = 2;
let total = 1;
while (total <= N) {
    floorCnt.push(floorCnt[floorCnt.length - 1] + total + plus);
    total += plus;
    plus++;
}

const dp = Array.from({ length: N + 1 }, () => Infinity);
dp[0] = 0;

for (let i = 1; i <= N; i++) {
    for (let j = 0; j < floorCnt.length; j++) {
        if (i - floorCnt[j] < 0) continue;

        dp[i] = Math.min(dp[i], dp[i - floorCnt[j]] + 1);
    }
}

console.log(dp[N]);
