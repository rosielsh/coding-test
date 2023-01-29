const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = +require('fs').readFileSync(filePath).toString().trim();

function solution() {
  let answer = 0;
  if(input % 4 === 0 && input % 100 !== 0 || input % 400 === 0) answer = 1;
  return answer;
}

console.log(solution());