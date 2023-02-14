// 선수 과목

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const subject = input.map(x=>x.split(' ').map(Number)).sort((a, b) => a[1] - b[1]);
const dp = Array.from({length: N+1}, ()=>0);

function solution() {
  for(let i=0; i<M; i++) {
    [a, b] = subject[i];
    dp[b] = Math.max(dp[a] + 1, dp[b]);
  }

  return dp.slice(1).map(x=>x+1).join(' ');
}

console.log(solution());