// 1, 2, 3 더하기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = +input.shift();

const dp = Array.from({ length: 11 }, () => 0);
dp[1] = 1;
dp[2] = 2;
dp[3] = 4;
for (let i = 4; i <= 10; i++) {
  dp[i] = dp[i - 3] + dp[i - 2] + dp[i - 1];
}

function solution() {
  let answer = [];
  for (let i = 0; i < T; i++) {
    answer.push(dp[+input.shift()]);
  }
  return answer.join("\n");
}

console.log(solution());
