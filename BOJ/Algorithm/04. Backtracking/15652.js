// N과 M (4)

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, M] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(Number);
const visited = Array.from({length: M}, ()=>0);

function solution(n, idx) {
  if(n === M) {
    console.log(visited.join(' '));
    return;
  }

  for(let i=idx; i<N; i++) {
    visited[n] = i+1;
    solution(n+1, i);
    visited[n] = 0;
  }
  
}

solution(0, 0);