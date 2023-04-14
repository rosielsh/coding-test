// 별 찍기 (다시)

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const n = require("fs").readFileSync(filePath).toString().trim();
let answer = [];

function star(i, j, n) {
  if (i % 3 === 1 && j % 3 === 1) {
    answer.push(" ");
  } else if (n === 1) {
    answer.push("*");
  } else {
    star(parseInt(i / 3), parseInt(j / 3), parseInt(n / 3));
  }
}

function solution() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      star(i, j, n);
    }
    answer.push("\n");
  }
  return answer.join("");
}

console.log(solution());
