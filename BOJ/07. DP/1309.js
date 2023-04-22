// 동물원

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = require("fs").readFileSync(filePath).toString().trim().split("\n").map(Number)[0];

function solution() {
  let answer;
  const dp = Array.from({ length: N + 1 }, () => Array(3).fill(0));
  dp[1] = [1, 1, 1];

  for (let i = 2; i <= N; i++) {
    dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % 9901;
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][1]) % 9901;
    dp[i][2] = (dp[i - 1][0] + dp[i - 1][2]) % 9901;
  }

  answer = dp[N].reduce((acc, cur) => acc + cur, 0);
  return answer;
}

console.log(solution());
