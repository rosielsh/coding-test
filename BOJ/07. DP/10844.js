// 쉬운 계단수

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = +require("fs").readFileSync(filePath).toString().trim();
const dp = Array.from({ length: N + 1 }, () => Array(10).fill(0));

function solution() {
  let answer = 0;
  for (let i = 1; i < 10; i++) dp[1][i] = 1;

  for (let i = 2; i <= N; i++) {
    for (let j = 0; j < 10; j++) {
      if (j === 0) dp[i][j] = dp[i - 1][j + 1] % 1000000000;
      else if (j === 9) dp[i][j] = dp[i - 1][j - 1] % 1000000000;
      else dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % 1000000000;
    }
  }

  for (let i = 0; i < 10; i++) {
    answer += dp[N][i];
  }
  return answer;
}

console.log(solution() % 1000000000);
