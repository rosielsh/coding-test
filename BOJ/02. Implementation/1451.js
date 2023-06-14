// 직사각형으로 나누기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [NM, ...rect] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = NM.split(" ").map(Number);
rect = rect.map((row) => row.replace("\r", "").split("").map(Number));

function calcSum(startX, endX, startY, endY) {
  let sum = 0;
  for (let i = startX; i <= endX; i++) {
    for (let j = startY; j <= endY; j++) {
      sum += rect[i][j];
    }
  }
  return sum;
}

function calcSum1() {
  if (M < 3) return 0;
  let result = 0;
  for (let i = 0; i < M - 2; i++) {
    for (let j = 1; j < M - 1; j++) {
      for (let k = 2; k < M; k++) {
        result = Math.max(
          result,
          calcSum(0, N - 1, i, j - 1) * calcSum(0, N - 1, j, k - 1) * calcSum(0, N - 1, k, M - 1)
        );
      }
    }
  }

  return result;
}

function calcSum2() {
  if (N < 3) return 0;
  let result = 0;
  for (let i = 0; i < N - 2; i++) {
    for (let j = 1; j < N - 1; j++) {
      for (let k = 2; k < N; k++) {
        result = Math.max(
          result,
          calcSum(i, j - 1, 0, M - 1) * calcSum(j, k - 1, 0, M - 1) * calcSum(k, N - 1, 0, M - 1)
        );
      }
    }
  }

  return result;
}

function calcSum3() {
  if (N < 2 || M < 2) return 0;
  let result = 0;
  for (let i = 0; i < M - 1; i++) {
    for (let j = 1; j < M; j++) {
      for (let k = 1; k < N; k++) {
        result = Math.max(
          result,
          calcSum(0, k - 1, 0, j - 1) * calcSum(0, k - 1, j, M - 1) * calcSum(k, N - 1, 0, M - 1)
        );
      }
    }
  }

  return result;
}

function calcSum4() {
  if (N < 2 || M < 2) return 0;
  let result = 0;
  for (let i = 0; i < M - 1; i++) {
    for (let j = 1; j < M; j++) {
      for (let k = 1; k < N; k++) {
        result = Math.max(
          result,
          calcSum(0, k - 1, 0, M - 1) * calcSum(k, N - 1, 0, j - 1) * calcSum(k, N - 1, j, M - 1)
        );
      }
    }
  }

  return result;
}

function calcSum5() {
  if (N < 2 || M < 2) return 0;
  let result = 0;
  for (let i = 0; i < N - 1; i++) {
    for (let j = 1; j < N; j++) {
      for (let k = 1; k < M; k++) {
        result = Math.max(
          result,
          calcSum(0, j - 1, 0, k - 1) * calcSum(j, N - 1, 0, k - 1) * calcSum(0, N - 1, k, M - 1)
        );
      }
    }
  }

  return result;
}

function calcSum6() {
  if (N < 2 || M < 2) return 0;
  let result = 0;
  for (let i = 0; i < N - 1; i++) {
    for (let j = 1; j < N; j++) {
      for (let k = 1; k < M; k++) {
        result = Math.max(
          result,
          calcSum(0, N - 1, 0, k - 1) * calcSum(0, j - 1, k, M - 1) * calcSum(j, N - 1, k, M - 1)
        );
      }
    }
  }

  return result;
}

function solution() {
  let answer = 0;
  answer = Math.max(answer, calcSum1(), calcSum2(), calcSum3(), calcSum4(), calcSum5(), calcSum6());

  return answer;
}

console.log(solution());
