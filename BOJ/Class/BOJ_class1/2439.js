const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim();

function solution() {
  let answer = '';
  for(let i=0; i<input; i++) {
    answer += ' '.repeat(input-i-1)+'*'.repeat(i+1)+'\n';
  }
  return answer;
}

console.log(solution());