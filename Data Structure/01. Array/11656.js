const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution() {
  let answer = [];
  for(let i=0; i<input[0].length; i++) {
    answer[i] = input[0].substr(i);
  }
  return answer.sort().join('\n');
}

console.log(solution());