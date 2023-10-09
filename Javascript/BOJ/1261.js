const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().replace(/\r/g, "").trim().split("\n");

const [M, N] = input.shift().split(" ").map(Number);
const map = input.map((x) => x.split("").map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs() {
  const deque = [[0, 0, 0]];
  const visited = Array.from({ length: N }, () => Array(M).fill(0));

  visited[0][0] = 0;

  while (deque.length > 0) {
    const [x, y, cnt] = deque.shift();

    if (x === N - 1 && y === M - 1) {
      console.log(cnt);
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

      if (visited[nx][ny]) continue;
      visited[nx][ny] = 1;

      // 다음 이동할 곳이 벽이라면
      if (map[nx][ny]) {
        deque.push([nx, ny, cnt + 1]); // 벽을 부순 경우는 제일 뒤로
      }
      // 벽을 안부숴도 된다면
      else {
        deque.unshift([nx, ny, cnt]); // 제일 앞으로
      }
    }
  }
}

bfs();
