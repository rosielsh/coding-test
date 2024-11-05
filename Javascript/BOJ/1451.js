const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const rect = input.map((x) => x.split("").map(Number));

const prefix = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= M; j++) {
    prefix[i][j] = prefix[i - 1][j] + prefix[i][j - 1] + rect[i - 1][j - 1] - prefix[i - 1][j - 1];
  }
}

let answer = 0; // 최대 합의 곱

const calcSum = (x1, y1, x2, y2) => {
  return prefix[x2][y2] - prefix[x1 - 1][y2] - prefix[x2][y1 - 1] + prefix[x1 - 1][y1 - 1];
};

// 가로로 3개
for (let i = 1; i <= N - 2; i++) {
  for (let j = i + 1; j <= N - 1; j++) {
    let r1 = calcSum(1, 1, i, M);
    let r2 = calcSum(i + 1, 1, j, M);
    let r3 = calcSum(j + 1, 1, N, M);

    answer = Math.max(answer, r1 * r2 * r3);
  }
}

// 세로로 3개
for (let i = 1; i <= M - 2; i++) {
  for (let j = i + 1; j <= M - 1; j++) {
    let r1 = calcSum(1, 1, N, i);
    let r2 = calcSum(1, i + 1, N, j);
    let r3 = calcSum(1, j + 1, N, M);

    answer = Math.max(answer, r1 * r2 * r3);
  }
}

// ㅏ
for (let i = 1; i <= N - 1; i++) {
  for (let j = 1; j <= M - 1; j++) {
    let r1 = calcSum(1, 1, N, j);
    let r2 = calcSum(1, j + 1, i, M);
    let r3 = calcSum(i + 1, j + 1, N, M);

    answer = Math.max(answer, r1 * r2 * r3);
  }
}

// ㅓ
for (let i = 1; i <= N - 1; i++) {
  for (let j = 1; j <= M - 1; j++) {
    let r1 = calcSum(1, 1, i, j);
    let r2 = calcSum(i + 1, 1, N, j);
    let r3 = calcSum(1, j + 1, N, M);

    answer = Math.max(answer, r1 * r2 * r3);
  }
}

// ㅗ
for (let i = 1; i <= N - 1; i++) {
  for (let j = 1; j <= M - 1; j++) {
    let r1 = calcSum(1, 1, i, j);
    let r2 = calcSum(1, j + 1, i, M);
    let r3 = calcSum(i + 1, 1, N, M);

    answer = Math.max(answer, r1 * r2 * r3);
  }
}

// ㅜ
for (let i = 1; i <= N - 1; i++) {
  for (let j = 1; j <= M - 1; j++) {
    let r1 = calcSum(1, 1, i, M);
    let r2 = calcSum(i + 1, 1, N, j);
    let r3 = calcSum(i + 1, j + 1, N, M);

    answer = Math.max(answer, r1 * r2 * r3);
  }
}

console.log(answer);
