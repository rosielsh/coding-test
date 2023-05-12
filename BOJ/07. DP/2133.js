// 타일 채우기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = require("fs").readFileSync(filePath).toString().trim().split("\n").map(Number)[0];

function solution() {
  let answer;
  const dp = Array.from({ length: N + 1 }, () => 0);

  if (N % 2 === 1) return 0;

  dp[2] = 3;

  for (let i = 4; i <= N; i += 2) {
    let sum = 0;
    for (let j = 2; j <= i - 4; j += 2) {
      sum += dp[j];
    }
    dp[i] = sum * 2 + dp[i - 2] * 3 + 2;
  }

  answer = dp[N];
  return answer;
}

console.log(solution());
