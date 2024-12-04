const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const house = input.slice(1).map((x) => x.split(""));

const start = [-1, -1];
const end = [-1, -1];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (house[i][j] === "#") {
      if (start[0] !== -1) {
        end[0] = i;
        end[1] = j;
      } else {
        start[0] = i;
        start[1] = j;
      }
    }
  }
}

const visited = Array.from({ length: 4 }, () => Array.from({ length: N }, () => Array(N).fill(Infinity)));

// 좌 우 상 하
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const queue = [];

for (let i = 0; i < 4; i++) {
  queue.push([...start, i, 0]);
  visited[i][start[0]][start[1]] = 0;
}

let answer = Infinity;

while (queue.length > 0) {
  const [cx, cy, dir, mirrorCnt] = queue.shift();

  if (cx === end[0] && cy === end[1]) {
    answer = Math.min(answer, mirrorCnt);
  }

  const nx = cx + dx[dir];
  const ny = cy + dy[dir];

  if (nx < 0 || nx >= N || ny < 0 || ny >= N || house[nx][ny] === "*") continue;

  if (visited[dir][nx][ny] < mirrorCnt) continue;

  visited[dir][nx][ny] = mirrorCnt;
  queue.push([nx, ny, dir, mirrorCnt]);

  if (house[nx][ny] === "!") {
    if (dir >= 2) {
      visited[0][nx][ny] = mirrorCnt;
      visited[1][nx][ny] = mirrorCnt;

      queue.push([nx, ny, 0, mirrorCnt + 1]);
      queue.push([nx, ny, 1, mirrorCnt + 1]);
    } else {
      visited[2][nx][ny] = mirrorCnt;
      visited[3][nx][ny] = mirrorCnt;

      queue.push([nx, ny, 2, mirrorCnt + 1]);
      queue.push([nx, ny, 3, mirrorCnt + 1]);
    }
  }
}

console.log(answer);
