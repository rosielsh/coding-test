// 좋다

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, numbers] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
numbers = numbers
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

function search(index, currentNum) {
  let left = 0;
  let right = N - 1;
  let sum;

  if (left === index) left++;
  if (right === index) right--;

  while (left < right) {
    sum = numbers[left] + numbers[right];
    if (sum === currentNum) {
      return true;
    } else if (sum < currentNum) {
      left++;
      if (left === index) left++;
    } else {
      right--;
      if (right === index) right--;
    }
  }

  return false;
}

function solution() {
  let answer = 0;

  if (N <= 2) return 0;

  for (let i = 0; i < N; i++) {
    if (search(i, numbers[i])) answer++;
  }
  return answer;
}

console.log(solution());
