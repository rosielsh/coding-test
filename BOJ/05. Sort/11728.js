const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
// 배열 합치기

const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const [A, B] = input.map((x) => x.split(" ").map(Number));

function solution() {
  let answer = [];
  let a_idx = 0;
  let b_idx = 0;

  for (let i = 0; i < N + M; i++) {
    if (a_idx === N) answer[i] = B[b_idx++];
    else if (b_idx === M) answer[i] = A[a_idx++];
    else if (A[a_idx] >= B[b_idx]) {
      answer[i] = B[b_idx++];
    } else if (A[a_idx] < B[b_idx]) {
      answer[i] = A[a_idx++];
    }
  }

  return answer.join(" ");
}

console.log(solution());
