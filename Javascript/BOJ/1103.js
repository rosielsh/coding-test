const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((x) =>
  x.split("").map((x) => {
    if (x === "H") return -1;
    else return Number(x);
  })
);

// 각 위치에서 갈 수 있는 최대 이동 횟수 저장
const dp = Array.from({ length: N }, () => Array(M).fill(-1));

// 사이클 검사용
const visited = Array.from({ length: N }, () => Array(M).fill(false));

// 무한 루프가 있는 경우
let hasCycle = false;

const isOut = (x, y) => x < 0 || x >= N || y < 0 || y >= M;

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const dfs = (x, y) => {
  if (isOut(x, y) || map[x][y] === -1) {
    return 0;
  }

  // 이미 방문 했슈
  if (visited[x][y]) {
    hasCycle = true;
    return 0;
  }

  if (dp[x][y] > -1) {
    return dp[x][y];
  }

  visited[x][y] = true;
  dp[x][y] = 0;

  for (let i = 0; i < 4; i++) {
    const dist = map[x][y];
    const nx = x + dist * dx[i];
    const ny = y + dist * dy[i];

    dp[x][y] = Math.max(dfs(nx, ny) + 1, dp[x][y]);
  }

  visited[x][y] = false;
  return dp[x][y];
};

const answer = dfs(0, 0);
console.log(hasCycle ? -1 : answer);
