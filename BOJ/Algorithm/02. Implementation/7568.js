// 덩치

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const size = input.map(x=>x.split(' ').map(Number));
const rank = [];

function solution() {
  let cnt;
  for(let k=0; k<N; k++) { // 모든 사람 
    [weight, height] = size[k];
    cnt = 0;
    for(let i=0; i<N; i++) { // 본인 제외 모든 사람
      if(i === k) continue;
      if(weight < size[i][0] && height < size[i][1]) {
        cnt++;
      }
    }
    rank[k] = cnt+1;
  }
  return rank.join(' ');
}

console.log(solution());