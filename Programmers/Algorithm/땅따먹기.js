const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let land = require('fs').readFileSync(filePath).toString().trim().split('\n');
land = land.map(x=>x.split(' ').map(Number));

const dp = Array.from({length: land.length}, ()=>Array(4).fill(0));

function solution() {
  let answer;
  dp[0] = [...land[0]];
  for(let i=1; i<land.length; i++) { // dp의 열
    for(let j=0; j<4; j++) { // dp의 행 
      for(let k=0; k<4; k++) {
        if(j === k) continue;
        dp[i][j] = Math.max(dp[i-1][k] + land[i][j], dp[i][j]);
      }
    }
  }
  return Math.max(...dp[land.length-1]);
}

console.log(solution());