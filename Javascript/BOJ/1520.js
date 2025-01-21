const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((x) => x.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array(M).fill(-1)); // 경로 개수

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const dfs = (x, y) => {
  if (x === N - 1 && y === M - 1) return (dp[x][y] = 1);

  if (dp[x][y] !== -1) return dp[x][y];

  dp[x][y] = 0;

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M || map[x][y] <= map[nx][ny]) continue;

    dp[x][y] += dfs(nx, ny);
  }

  return dp[x][y];
};

dfs(0, 0);

console.log(dp[0][0]);
