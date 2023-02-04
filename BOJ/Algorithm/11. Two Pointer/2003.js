// 수들의 합 2

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const A = input[1].split(' ').map(Number);

function solution() {
  let answer = 0;
  let left = 0;
  let right = 0;
  let sum = A[0];

  while(right < N) { // 조건을 left <= right는 빼고 넣어야 함
    if(sum === M) {
      answer++;
      sum += A[++right];
    } else if(sum < M) {
      sum += A[++right];
    } else if(sum > M) {
      sum -= A[left++];
    }
  }

  return answer;
}

console.log(solution());