// 소수 찾기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const number = input[1].split(" ").map(Number);

function isPrime(n) {
  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function solution() {
  let answer = 0;
  number.forEach((x) => {
    if (x !== 1 && isPrime(x)) answer++;
  });

  return answer;
}

console.log(solution());
