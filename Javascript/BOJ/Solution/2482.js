// 색상환

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, K] = require("fs").readFileSync(filePath).toString().trim().split("\n").map(Number);

function solution() {
  let answer;
  const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    dp[i][0] = 1;
    dp[i][1] = i;
  }

  for (let i = 2; i <= N; i++) {
    for (let j = 2; j <= K; j++) {
      dp[i][j] = (dp[i - 2][j - 1] + dp[i - 1][j]) % 1000000003;
    }
  }

  answer = (dp[N - 3][K - 1] + dp[N - 1][K]) % 1000000003;
  return answer;
}

console.log(solution());
