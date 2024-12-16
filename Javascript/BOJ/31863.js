const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((x) => x.split(""));
const visited = Array.from({ length: N }, () => Array(M).fill(-1));
const start = [0, 0];

let total = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "@") {
      start[0] = i;
      start[1] = j;
    }

    if (map[i][j] === "*") {
      visited[i][j] = 1;
      total++;
    }
    if (map[i][j] === "#") {
      visited[i][j] = 2;
      total++;
    }
  }
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let breakCnt = 0;

const bfs = () => {
  const queue = [];

  visited[start[0]][start[1]] = 0;

  for (let i = 0; i < 4; i++) {
    for (let d = 1; d <= 2; d++) {
      const nx = start[0] + d * dx[i];
      const ny = start[1] + d * dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) break;
      if (map[nx][ny] === "|") break;

      queue.push([nx, ny]);
    }
  }

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x < 0 || x >= N || y < 0 || y >= M) continue;
    if (visited[x][y] === 0 || map[x][y] === "|") continue;

    // 건물있으면
    if (visited[x][y] > -1) {
      visited[x][y] -= 1;

      if (visited[x][y] === 0) {
        breakCnt++;
        queue.push([x, y]);

        for (let d = 0; d < 4; d++) {
          const nx = x + dx[d];
          const ny = y + dy[d];

          queue.push([nx, ny]);
        }
      }
    } else if (visited[x][y] === -1) visited[x][y] = 0;
  }
};

bfs();

console.log(`${breakCnt} ${total - breakCnt}`);
