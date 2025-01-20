const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const info = input.slice(1).map((x) => x.split(" ").map(Number));

const dp = Array.from({ length: N + 1 }, () => 0); // 모든 작업을 완료하기 위한 최소 시간
dp[1] = info[0][0];

for (let i = 2; i <= N; i++) {
  const [time, cnt, ...nums] = info[i - 1];

  dp[i] = time;

  for (let num of nums) {
    dp[i] = Math.max(dp[i], dp[num] + time);
  }
}

console.log(Math.max(...dp));
