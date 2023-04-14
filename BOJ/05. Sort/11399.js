// ATM

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const n = +input[0];
const P = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function solution() {
  let answer = P[0];
  for (let i = 1; i < P.length; i++) {
    P[i] += P[i - 1];
    answer += P[i];
  }
  return answer;
}

console.log(solution());
