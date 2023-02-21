// 포도주 시식

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[n, ...wine] = require('fs').readFileSync(filePath).toString().trim().split('\n');
n = +n;
wine = wine.map(Number);

const dp = Array.from({length: n+1}, ()=>0);

function solution() {
  dp[1] = wine[0];
  dp[2] = wine[0] + wine[1];
  dp[3] = Math.max(wine[0]+wine[1], wine[1]+wine[2], wine[0]+wine[2]);

  for(let i=4; i<=n; i++) {
    dp[i] = Math.max(dp[i-3] + wine[i-2] + wine[i-1], dp[i-2] + wine[i-1], dp[i-1]);
  }

  return dp[n];
}

console.log(solution());