// 벌집

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(Number);

function solution() {
  let sum = 1;
  let i = 1;
  while (input[0] > sum) {
    sum = sum + 6 * i++;
  }
  return i;
}

console.log(solution());
