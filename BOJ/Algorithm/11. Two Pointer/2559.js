// 수열

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const temp = input[1].split(' ').map(Number);

function solution() {
  let answer;
  let left = 0;
  let right = K-1;
  let sum = temp.slice(left, right+1).reduce((acc, cur) => acc+cur, 0);
  let maxTemp = Number.MIN_SAFE_INTEGER;

  while(right !== N) {
    maxTemp = Math.max(sum, maxTemp);
    sum -= temp[left++];
    sum += temp[++right];
  }
  return maxTemp;
}

console.log(solution());