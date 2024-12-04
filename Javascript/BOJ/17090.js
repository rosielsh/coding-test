const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const miro = input.slice(1).map((x) => x.split(""));

const dp = Array.from({ length: N }, () => Array(M).fill(-1)); // -1: 미방문, 1 : 탈출 가능, 0: 사이클

const getNextDir = (str) => {
  if (str === "U") return [-1, 0];
  else if (str === "D") return [1, 0];
  else if (str === "L") return [0, -1];
  else if (str === "R") return [0, 1];
};

const dfs = (x, y) => {
  if (x < 0 || x >= N || y < 0 || y >= M) return 1; // 탈출 가능하면 1로 갱신

  if (dp[x][y] > -1) return dp[x][y];

  dp[x][y] = 0;

  const [dx, dy] = getNextDir(miro[x][y]);
  return (dp[x][y] = dfs(x + dx, y + dy));
};

let answer = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (dfs(i, j) === 1) {
      answer++;
    }
  }
}

console.log(answer);
