// 토마토

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[MN, ...tomato] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[M, N] = MN.split(" ").map(Number);
tomato = tomato.map((x) => x.replace("\r", "").split(" ").map(Number));
const visited = Array.from({ length: N }, () => Array(M).fill(0));

const posY = [0, 0, -1, 1];
const posX = [-1, 1, 0, 0];

function bfs(one) {
  const needVisit = [...one];

  let idx = 0;
  while (needVisit.length !== idx) {
    [curY, curX] = needVisit[idx];
    visited[curY][curX] = 1;

    for (let i = 0; i < 4; i++) {
      [adjY, adjX] = [curY + posY[i], curX + posX[i]];
      if (adjY < 0 || adjY >= N || adjX < 0 || adjX >= M) continue;
      if (visited[adjY][adjX] || tomato[adjY][adjX] !== 0) continue;

      tomato[adjY][adjX] = tomato[curY][curX] + 1;
      visited[adjY][adjX] = 1;
      needVisit.push([adjY, adjX]);
    }
    idx++;
  }
}

function solution() {
  let one = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (tomato[i][j] === 1) {
        one.push([i, j]);
      }
    }
  }

  bfs(one);

  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (tomato[i][j] === 0) return -1;
      if (tomato[i][j] > max) max = tomato[i][j];
    }
  }
  return max - 1;
}

console.log(solution());
