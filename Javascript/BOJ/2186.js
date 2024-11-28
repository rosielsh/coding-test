const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const map = input.slice(1, N + 1).map((x) => x.split(""));
const alpha = input.slice(N + 1)[0].split("");

let dp = Array.from({ length: alpha.length + 1 }, () => Array.from({ length: N }, () => Array(M).fill(-1))); // 각 지점에서 만들 수 있는 경로의 개수 저장

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const dfs = (x, y, idx) => {
  if (dp[idx][x][y] !== -1) {
    return dp[idx][x][y];
  }

  if (idx === alpha.length) {
    return (dp[idx][x][y] = 1);
  }

  dp[idx][x][y] = 0;

  for (let i = 0; i < 4; i++) {
    for (let k = 1; k <= K; k++) {
      const nx = x + k * dx[i];
      const ny = y + k * dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
      if (alpha[idx] !== map[nx][ny]) continue;

      dp[idx][x][y] += dfs(nx, ny, idx + 1);
    }
  }

  return dp[idx][x][y];
};

let answer = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === alpha[0]) {
      answer += dfs(i, j, 1);
    }
  }
}

console.log(answer);
