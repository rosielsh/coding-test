const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const n = +input.shift();
const room = input.map((x) => x.split("").map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let answer = 0;
const visited = Array.from({ length: n }, () => Array(n).fill(Number.MAX_SAFE_INTEGER));
const bfs = () => {
  const queue = [[0, 0, 0]];
  visited[0][0] = 0;

  while (queue.length) {
    const [x, y, cnt] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

      if (visited[nx][ny] <= cnt) continue; // 이미 다음에 갈 곳이 벽을 덜 부순상태로 갔다면

      if (room[nx][ny]) {
        visited[nx][ny] = cnt;
        queue.push([nx, ny, cnt]);
      } else {
        visited[nx][ny] = cnt + 1;
        queue.push([nx, ny, cnt + 1]);
      }
    }
  }
};

bfs();
console.log(visited[n - 1][n - 1]);
