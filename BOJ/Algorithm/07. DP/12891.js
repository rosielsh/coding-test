// DNA 비밀번호

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [S, P] = input[0].split(' ').map(Number);
const dna = input[1].split('');
const [a, c, g, t] = input[2].split(' ').map(Number);
let cnt = Array.from({length: 4}, ()=>0);
let dp = Array.from({length: S+1}, ()=>Array(4).fill(0));

function solution() {
  let answer = 0;
  for(let i=1; i<=S; i++) {
    if(dna[i-1] === 'A') dp[i][0] = dp[i-1][0] + 1;
    else dp[i][0] = dp[i-1][0];
    
    if(dna[i-1] === 'C') dp[i][1] = dp[i-1][1] + 1;
    else dp[i][1] = dp[i-1][1];

    if(dna[i-1] === 'G') dp[i][2] = dp[i-1][2] + 1;
    else dp[i][2] = dp[i-1][2];

    if(dna[i-1] === 'T') dp[i][3] = dp[i-1][3] + 1;
    else dp[i][3] = dp[i-1][3];
  }
  

  for(let i=0; i<S-P+1; i++) {
    cnt[0] = dp[i+P][0]-dp[i][0];
    cnt[1] =  dp[i+P][1]-dp[i][1];
    cnt[2] = dp[i+P][2]-dp[i][2];
    cnt[3] = dp[i+P][3]-dp[i][3];

    if(cnt[0] >= a && cnt[1] >= c && cnt[2] >= g && cnt[3] >= t) {
      answer++;
    }
  }
  return answer;
}

console.log(solution());