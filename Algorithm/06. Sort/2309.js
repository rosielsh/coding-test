const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n').map(Number);

function solution() {
  let answer;
  let sum = input.reduce((acc,cur) => acc+cur, 0);

  outerFor: for(let i=0; i<9; i++) {
    innerFor: for(let j=i+1; j<9; j++) {
      if(sum - (input[i] + input[j]) === 100) {
        input[i] = -1;
        input[j] = -1;
        break outerFor;
      }
    }
  }
  answer = input.sort((a, b) => a - b);
  return answer.slice(2).join('\n');
}

console.log(solution());