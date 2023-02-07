// 달팽이는 올라가고 싶다

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [A, B, V] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(Number);

function solution() {
  let answer = 0;
  if((V-A)%(A-B) === 0) {
    answer = (V-A)/(A-B) + 1;
  } else answer = parseInt((V-A)/(A-B)) + 2;
  return answer;
}

console.log(solution());