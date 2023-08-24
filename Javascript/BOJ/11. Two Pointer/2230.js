// 수 고르기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const A = input.map(Number).sort((a, b) => a - b);

function solution() {
  let left = 0;
  let right = 0;
  let min = Number.MAX_SAFE_INTEGER;
  let sub;
  while (left <= right) {
    sub = A[right] - A[left];
    if (sub < M) {
      if (right === N - 1) return min;
      right++;
    } else if (sub > M) {
      left++;
      min = Math.min(min, sub);
    } else if (sub === M) {
      return sub;
    }
  }
}

console.log(solution());
