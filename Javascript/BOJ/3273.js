// 두수의 합

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const n = +input[0];
const a = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
const x = +input[2];

function solution() {
  let answer = 0;
  let left = 0;
  let right = n - 1;
  let sum;
  while (left !== right) {
    sum = a[left] + a[right];
    if (sum > x) right--;
    else if (sum < x) left++;
    else if (sum === x) {
      answer++;
      left++;
    }
  }

  return answer;
}

console.log(solution());
