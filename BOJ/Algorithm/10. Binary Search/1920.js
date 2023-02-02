// 수 찾기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const A = input[1].split(' ').map(Number).sort((a, b)=>a-b);
const M = +input[2];
const search = input[3].split(' ').map(Number);
const answerList = [];

function solution() {
  for(let i=0; i<M; i++) {
    let answer = 0;
    let left = 0;
    let right = N-1;
    let find = search[i];
    while(left <= right) {
      mid = parseInt((left+right)/2);
      if (find === A[mid]) {
        answer = 1;
        break;
      } else if(find < A[mid]) {
        right = mid - 1;
      } else if(find > A[mid]) {
        left = mid + 1;
      }
    }
    answerList.push(answer);
  }
  return answerList.join('\n');
}

console.log(solution());