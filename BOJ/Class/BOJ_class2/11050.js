// 이항계수 1

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [n, k] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(Number);

function factorial(n) {
  let result = 1;
  for(let i=n; i>0; i--) {
    result*=i;
  }
  return result;
}

function solution() {
  let answer;
  answer = factorial(n) / (factorial(k)*factorial(n-k));
  return answer;
}

console.log(solution());