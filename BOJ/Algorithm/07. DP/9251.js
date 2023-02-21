// LCS

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[A, B] = require('fs').readFileSync(filePath).toString().trim().split('\n').map(x=>x.replace('\r','').split(''));
const dp = Array.from({length: B.length+1}, ()=>Array(A.length+1).fill(0));

function solution() {
  let answer = Number.MIN_SAFE_INTEGER;
  for(let i=1; i<=B.length; i++) {
    for(let j=1; j<=A.length; j++) {
      if(A[j-1] === B[i-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);

      if(dp[i][j] > answer) answer = dp[i][j];
    }
  }
  
  return answer;
}

console.log(solution());