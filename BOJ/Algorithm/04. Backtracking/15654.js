// N과 M (5)

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, num] = require('fs').readFileSync(filePath).toString().trim().split('\n');
[N, M] = NM.split(' ').map(Number);
num = num.split(' ').map(Number).sort((a, b)=>a-b);
const combination = Array.from({length: M}, ()=>0);
const visited = Array.from({length: N}, ()=>0);

function solution(idx) {
  if(idx === M) {
    console.log(combination.join(' '));
    return;
  }

  for(let i=0; i<N; i++) {
    if(visited[i]) continue;
    visited[i] = 1;
    combination[idx] = num[i];
    solution(idx+1);
    visited[i] = 0;
    combination[idx] = 0;
  }
}

solution(0);