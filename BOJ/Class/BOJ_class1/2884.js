const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split(' ').map(Number);

function solution() {
  let answer;
  if(input[1] >= 45) {
    answer = `${input[0]} ${input[1]-45}`;
  } else {
    if(input[0] === 0) {
      answer = `23 ${60-(45-input[1])}`;
    } else {
      answer = `${input[0]-1} ${60-(45-input[1])}`;
    }
  }
  return answer;
}

console.log(solution());