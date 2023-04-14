//  암기왕

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = +input.shift();

function solution() {
  let answer;
  let find;
  let left;
  let right;
  let mid;
  const answerList = [];

  for (let t = 0; t < T * 4; t += 4) {
    N = input[t];
    one = input[t + 1]
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b);
    M = input[t + 2];
    two = input[t + 3].split(" ").map(Number);

    for (let i = 0; i < M; i++) {
      find = two[i];
      answer = 0;
      left = 0;
      right = N - 1;
      while (left <= right) {
        mid = parseInt((left + right) / 2);
        if (find === one[mid]) {
          answer = 1;
          break;
        } else if (find < one[mid]) {
          right = mid - 1;
        } else if (find > one[mid]) {
          left = mid + 1;
        }
      }
      answerList.push(answer);
    }
  }
  return answerList.join("\n");
}

console.log(solution());
