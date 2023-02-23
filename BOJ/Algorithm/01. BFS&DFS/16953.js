// A → B

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[A, B] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(Number);

function solution() {
  let answer = 1;
  while(B >= A) {
    if(A === B) return answer;
    if(B % 2 === 0) {
      B= parseInt(B/2);
      answer++;
    } else if(B % 10 === 1) {
      B= parseInt(B/10);
      answer++;
    } else break;
  }
  return -1;
}

console.log(solution());