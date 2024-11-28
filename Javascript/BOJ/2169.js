const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array(M).fill(-Infinity));

dp[0][0] = map[0][0];

// 1행은 왼쪽에서 오는 경우가 최대
for (let i = 1; i < M; i++) {
  dp[0][i] = dp[0][i - 1] + map[0][i];
}

// 2행부터 시작
for (let i = 1; i < N; i++) {
  const temp = Array(M).fill(-Infinity);

  // 위
  for (let j = 0; j < M; j++) {
    temp[j] = dp[i - 1][j] + map[i][j];
  }

  // 왼쪽
  const left = Array(M).fill(-Infinity);

  left[0] = temp[0];
  for (let j = 1; j < M; j++) {
    left[j] = Math.max(temp[j], left[j - 1] + map[i][j]);
  }

  // 오른쪽
  const right = Array(M).fill(-Infinity);

  right[M - 1] = temp[M - 1];
  for (let j = M - 2; j >= 0; j--) {
    right[j] = Math.max(temp[j], right[j + 1] + map[i][j]);
  }

  // 최대값 갱신
  for (let j = 0; j < M; j++) {
    dp[i][j] = Math.max(left[j], right[j]);
  }
}

console.log(dp[N - 1][M - 1]);
