// 1로 만들기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const n = +require('fs').readFileSync(filePath).toString().trim();
const dp = Array.from({length: n+1}, ()=>0);

function solution() {
  for(let i=2; i<=n; i++) {
    dp[i] = dp[i-1] + 1;
    if(i % 3 === 0) {
      dp[i] = Math.min(dp[i], dp[i/3] + 1);
    }
    if(i % 2 === 0) {
      dp[i] = Math.min(dp[i], dp[i/2] + 1);
    }
  }
  return dp[n];
}

console.log(solution());