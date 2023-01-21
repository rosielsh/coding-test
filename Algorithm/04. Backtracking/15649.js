// 문제 : N과 M(1)

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(x=>+x);
let answer = Array.from({length: M}, ()=>0);
const isUsed = Array.from({length: N+1}, ()=>false);

function solution(K) {
  if(K === M) { // 종료 조건
    console.log(answer.join(' '));
    return;
  }

  for(let i=1; i<=N; i++) {
    if(!isUsed[i]) {
      isUsed[i] = true;
      answer[K] = i;
      solution(K+1);
      isUsed[i] = false;
    }
  }
}

solution(0);