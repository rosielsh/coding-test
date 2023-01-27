// 문제 : N과 M(2)

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, M] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(x=>+x);
const isUsed = Array.from({length: N+1}, ()=>false); // 1~N까지의 수 중 방문여부 저장
const answer = Array.from({length: M}, ()=>0); // 현재까지 탐색한 조합

function solution(K, idx) {
  if(K===M) {
    console.log(answer.join(' '));
    return;
  }

  for(let i=idx; i<=N; i++) {
    if(!isUsed[i]) { // [ false, false, false,..];
      isUsed[i] = true;
      answer[K] = i;
      solution(K+1, i+1);
      isUsed[i] = false;
    }
  }
}

solution(0, 1);