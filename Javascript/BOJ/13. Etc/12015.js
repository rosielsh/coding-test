// 가장 긴 증가하는 부분 수열 2

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const A = input[1].split(" ").map(Number);
const answer = [A[0]];

function binary_search(value) {
  let left = 0;
  let right = answer.length - 1;
  let mid;
  while (left < right) {
    mid = parseInt((left + right) / 2);
    if (answer[mid] > value) {
      right = mid;
    } else if (answer[mid] < value) {
      left = mid + 1;
    } else if (answer[mid] === value) {
      return mid;
    }
  }
  return right;
}

function solution() {
  for (let i = 1; i < N; i++) {
    if (answer.at(-1) < A[i]) {
      answer.push(A[i]);
    } else {
      answer[binary_search(A[i])] = A[i];
    }
  }
  return answer.length;
}

console.log(solution());
