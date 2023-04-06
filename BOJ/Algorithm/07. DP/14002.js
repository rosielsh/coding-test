// 가장 긴 증가하는 부분 수열 4

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, A] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
A = A.split(" ").map(Number);

function solution() {
  let answer = "";

  const dp = Array.from({ length: N }, () => 1);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (A[i] > A[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i]);
      }
    }
  }

  let maxCnt = Math.max(...dp);

  let max = maxCnt;
  let result = [];
  for (let i = N - 1; i >= 0; i--) {
    if (dp[i] === max) {
      result.push(A[i]);
      max--;
    }
  }

  answer += `${maxCnt}\n`;
  answer += `${result.reverse().join(" ")}`;

  return answer;
}

console.log(solution());
