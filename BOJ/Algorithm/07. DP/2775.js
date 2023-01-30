// 문제 : 부녀회장이 될테야

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [T, ...apt] = require('fs').readFileSync(filePath).toString().trim().split('\n').map(Number);
const dp = Array.from({length: 15}, ()=>Array(15).fill(0));
for(let i=0; i<15; i++) {
  dp[0][i] = i;
}

function solution() {
  let answer = '';
  let sum;
  for(let i=1; i<=14; i++) { // 층
    for(let j=1; j<=14; j++) { // 호
      sum = 0;
      for(let k=1; k<=j; k++) {
        sum += dp[i-1][k];
      }
      dp[i][j] = sum;
    }
  }

  let k;
  let n;
  for(let t=0; t<T*2; t+=2) {
    k = apt[t];
    n = apt[t+1];

    answer += `${dp[k][n]}\n`;
  }
  return answer;
}

console.log(solution());