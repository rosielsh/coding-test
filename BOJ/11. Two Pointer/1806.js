// 부분합

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, S] = input[0].split(" ").map(Number);
const numArr = input[1].split(" ").map(Number);

function solution() {
  let answer = Number.MAX_SAFE_INTEGER;
  let left = 0;
  let right = 0;
  let sum = numArr[0];
  while (left < N) {
    if (sum >= S) {
      answer = Math.min(answer, right - (left - 1));
      sum -= numArr[left++];
    } else {
      right++;
      if (right === N) break;
      sum += numArr[right];
    }
  }
  if (answer === Number.MAX_SAFE_INTEGER) return 0;
  return answer;
}

console.log(solution());
