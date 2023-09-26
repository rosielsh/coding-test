// 행렬

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, ...AB] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[N, M] = NM.split(" ").map(Number);
[A, B] = [AB.splice(0, N), AB.splice(0, N)];

N = +N;
M = +M;
A = A.map((x) => x.replace("\r", "").split("").map(Number));
B = B.map((x) => x.replace("\r", "").split("").map(Number));

function isImpossible() {
  if (N < 3 || M < 3) return true;
}

function convert(r, c) {
  for (let i = r; i < r + 3; i++) {
    for (let j = c; j < c + 3; j++) {
      A[i][j] = A[i][j] === 0 ? 1 : 0;
    }
  }
}

function isSame() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (A[i][j] !== B[i][j]) return false;
    }
  }
  return true;
}

function solution() {
  let answer = -1;
  let cnt = 0;
  if (isSame()) return 0;
  if (isImpossible()) return -1;

  for (let i = 0; i < N - 2; i++) {
    for (let j = 0; j < M - 2; j++) {
      if (A[i][j] !== B[i][j]) {
        convert(i, j);
        cnt++;
        if (isSame()) return cnt;
      }
    }
  }
  return answer;
}

console.log(solution());
