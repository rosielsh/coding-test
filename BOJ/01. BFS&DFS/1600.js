// 말이 되고픈 원숭이

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [K, WH, ...board] = require("fs").readFileSync(filePath).toString().trim().split("\n");
K = +K;
const [W, H] = WH.split(" ").map(Number);
board = board.map((x) => x.split(" ").map(Number));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const hx = [-2, -1, 1, 2, -2, -1, 1, 2];
const hy = [-1, -2, 2, 1, 1, 2, -2, -1];

function bfs(x, y) {
  const queue = [[x, y, 0, 0]];
  const visited = Array.from({ length: K + 1 }, () =>
    Array.from({ length: H }, () => Array(W).fill(0))
  );
  visited[0][x][y] = 1;

  while (queue.length) {
    const [cx, cy, dist, hMove] = queue.shift();

    if (cx === H - 1 && cy === W - 1) return dist;

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + cx;
      const ny = dy[i] + cy;

      if (nx < 0 || nx >= H || ny < 0 || ny >= W || board[nx][ny] || visited[hMove][nx][ny])
        continue;

      visited[hMove][nx][ny] = 1;
      queue.push([nx, ny, dist + 1, hMove]);
    }

    if (hMove >= K) continue;

    // 말 이동
    for (let i = 0; i < 8; i++) {
      const nx = hx[i] + cx;
      const ny = hy[i] + cy;

      if (nx < 0 || nx >= H || ny < 0 || ny >= W || board[nx][ny] || visited[hMove + 1][nx][ny])
        continue;

      visited[hMove + 1][nx][ny] = 1;
      queue.push([nx, ny, dist + 1, hMove + 1]);
    }
  }

  return -1;
}

function solution() {
  let answer = bfs(0, 0);
  return answer;
}

console.log(solution());
