// 30

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = require("fs").readFileSync(filePath).toString().trim().split("").map(Number);

function solution() {
  let answer;

  let sum = N.reduce((acc, cur) => acc + cur, 0);
  if (sum % 3 !== 0) return -1;

  const sortedN = [...N];
  sortedN.sort((a, b) => b - a);
  if (sortedN.at(-1) !== 0) return -1;

  answer = N.sort((a, b) => b - a).join("");
  return answer;
}

console.log(solution());
