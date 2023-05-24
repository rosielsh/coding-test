// 줄 세우기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n, numbers] = require("fs").readFileSync(filePath).toString().trim().split("\n");
n = +n;
numbers = numbers.split(" ").map(Number);

function solution() {
  let answer;
  const dp = Array.from({ length: n + 1 }, () => 0);
  let maxValue = Number.MIN_SAFE_INTEGER;

  numbers.forEach((num, i) => {
    dp[num] = dp[num - 1] + 1;
    maxValue = Math.max(maxValue, dp[num]);
  });

  answer = n - maxValue;
  return answer;
}

console.log(solution());
