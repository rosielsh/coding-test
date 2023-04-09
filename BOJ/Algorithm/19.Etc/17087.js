// 숨바꼭질 6

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NS, A] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[N, S] = NS.split(" ").map(Number);
A = A.split(" ").map(Number);

function gcd(min, max) {
  return min % max === 0 ? max : gcd(max, min % max);
}

function solution() {
  let answer = Math.abs(S - A[0]);

  for (let i = 1; i < N; i++) {
    answer = gcd(answer, Math.abs(S - A[i]));
  }
  return answer;
}

console.log(solution());
