const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const work = input.map((x) => x.split(" ").map(Number));
work.unshift(0);
work.push([0, 0]);

const dp = Array.from({ length: N + 2 }, () => 0);

let max = 0;

for (let i = 1; i <= N + 1; i++) {
    const [time, pay] = work[i];

    max = Math.max(dp[i], max);

    if (i + time <= N + 1) {
        dp[i + time] = Math.max(dp[i + time], max + pay);
    }
}

console.log(dp[N + 1]);
