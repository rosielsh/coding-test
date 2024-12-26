const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const water = input.slice(0, N).map((x) => x.split(" ").map(Number));
const [x, y, p] = input[N].split(" ").map(Number);

let answer = water[x][y];

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const dfs = (cnt, x, y, prev, sum, visited) => {
  if (cnt <= p) {
    answer = Math.max(answer, sum);
  }

  if (cnt >= p) {
    return;
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
    if (visited[nx][ny]) continue;

    visited[nx][ny] = true;

    const prevDir = i < 2 ? 0 : 1;

    if (prev === -1) {
      dfs(cnt + 1, nx, ny, prevDir, sum + water[nx][ny], visited);
    } else if (prev === 0) {
      let next = cnt;

      if (i < 2) next += 1;
      else next += 2;

      dfs(next, nx, ny, prevDir, sum + water[nx][ny], visited);
    } else {
      let next = cnt;

      if (i < 2) next += 2;
      else next += 1;

      dfs(next, nx, ny, prevDir, sum + water[nx][ny], visited);
    }

    visited[nx][ny] = false;
  }
};

const visited = Array.from({ length: N }, () => Array(M).fill(false));
visited[x][y] = true;

dfs(0, x, y, -1, water[x][y], visited);

console.log(answer);
