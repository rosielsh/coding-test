// 암호코드

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const talk = require("fs").readFileSync(filePath).toString().trim().split("").map(Number);

function solution() {
  let answer = 0;
  const dp = Array.from({ length: talk.length + 1 }, () => 0);

  if (talk[0] === 0) return 0;

  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i < dp.length; i++) {
    if (talk[i - 1] === 0) {
      if (talk[i - 2] === 1 || talk[i - 2] === 2) {
        dp[i] = dp[i - 2] % 1000000;
      }
    } else {
      const value = Number(talk.slice(i - 2, i).join(""));
      if (value >= 10 && value <= 26) {
        dp[i] = (dp[i - 2] + dp[i - 1]) % 1000000;
      } else {
        dp[i] = dp[i - 1] % 1000000;
      }
    }
  }

  answer = dp.at(-1) % 1000000;
  return answer;
}

console.log(solution());
