// 가장 긴 증가하는 부분 수열

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const arr = input[1].split(" ").map(Number);
const dp = Array.from({ length: N }, () => 0);

function solution() {
  let answer;
  for (let i = 0; i < N; i++) {
    // 비교 기준
    for (let j = 0; j < i; j++) {
      // 그 전 수까지 검사
      if (arr[j] < arr[i]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
  }
  return dp.sort((a, b) => a - b)[N - 1] + 1;
}

console.log(solution());
