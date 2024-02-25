const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [C, N] = input.shift().split(" ").map(Number);
const city = input.map((x) => x.split(" ").map(Number));
city.unshift([0, 0]);

// 구하는것 : 투자해야하는 돈의 최솟값
const dp = Array.from({ length: 100001 }, () => 0);

for (let i = 1; i <= N; i++) {
    const [cost, people] = city[i];
    // 1원 부터 100000원까지
    for (let j = 1; j <= 100000; j++) {
        if (j - cost < 0) continue;
        dp[j] = Math.max(dp[j], dp[j - cost] + people);
    }
}

for (let i = 1; i <= 100000; i++) {
    if (dp[i] >= C) {
        console.log(i);
        break;
    }
}
