const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().replace(/\r/g, "").trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((x) => x.split("").map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs() {
  const queue = [[0, 0, 0]];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(2).fill(0))
  );

  visited[0][0][0] = 1;

  // visited[a][b][0/1] => 0:벽을 부수지 않고 방문, 1:벽을 부수고 방문
  // ex) visited[a][b][1] = (a, b)까지 벽을 부쉈을 때 이동한 최단거리 저장
  let idx = 0;
  while (queue.length !== idx) {
    const [x, y, isBreak] = queue[idx];

    if (x === N - 1 && y === M - 1) {
      // 현재 상태에서의 최단 경로 반환
      return visited[N - 1][M - 1][isBreak];
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

      // 간 곳이 벽인 경우
      if (map[nx][ny]) {
        if (isBreak) continue;
        visited[nx][ny][1] = visited[x][y][0] + 1;
        queue.push([nx, ny, 1]);
      }
      // 간 곳이 벽이 아닌 경우
      else {
        if (visited[nx][ny][isBreak]) continue;
        visited[nx][ny][isBreak] = visited[x][y][isBreak] + 1;
        queue.push([nx, ny, isBreak]);
      }
    }
    idx++;
  }

  return -1;
}

console.log(bfs());
