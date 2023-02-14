// N과 M (10)

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
let arr = input[1].split(' ').map(Number).sort((a, b) => a-b);
const visited = Array.from({length: M}, ()=>0);
const answer = [];

function solution(len, idx) {
  if(len === M) {
    answer.push(visited.join(' '));
    return;
  }

  for(let i=idx; i<N; i++) {
    visited[len] = arr[i];
    solution(len+1, i+1);
    visited[len] = 0;
  }
  
  return [...new Set(answer)].join('\n');
}

console.log(solution(0, 0));