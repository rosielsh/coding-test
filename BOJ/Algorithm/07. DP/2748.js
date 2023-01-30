// 피보나치 수 2

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const n = +require('fs').readFileSync(filePath).toString().trim();
const dp = Array.from({length: n+1}, ()=>0);
dp[1] = 1;

function solution() {
  for(let i=2; i<=n; i++) {
    dp[i] = BigInt(dp[i-1]) + BigInt(dp[i-2]);
  }
  return dp[n].toString();
}

console.log(solution());