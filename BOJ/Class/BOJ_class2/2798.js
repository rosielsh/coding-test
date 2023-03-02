// 블랙잭

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const card = input[1].split(' ').map(Number);

function solution() {
  let answer = Number.MIN_SAFE_INTEGER;
  for(let i=0; i<N-2; i++) {
    for(let j=i+1; j<N-1; j++) {
      for(let k=j+1; k<N; k++) {
        const sum = card[i]+card[j]+card[k];
        if(sum <= M) {
          answer = Math.max(answer, sum);
        }
      }
    }
  }
  return answer;
}

console.log(solution());