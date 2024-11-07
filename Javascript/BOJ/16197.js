const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const board = input.map((x) => x.split(""));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

let answer = Number.MAX_SAFE_INTEGER;

const dfs = (cnt, x1, y1, x2, y2) => {
  if (cnt === 10) {
    return;
  }

  for (let i = 0; i < 4; i++) {
    const dirX = dx[i];
    const dirY = dy[i];

    const nx1 = x1 + dirX;
    const ny1 = y1 + dirY;

    const nx2 = x2 + dirX;
    const ny2 = y2 + dirY;

    if (
      (nx1 < 0 || nx1 >= N || ny1 < 0 || ny1 >= M) &&
      (nx2 < 0 || nx2 >= N || ny2 < 0 || ny2 >= M)
    ) {
      continue;
    }

    if (nx1 < 0 || nx1 >= N || ny1 < 0 || ny1 >= M || nx2 < 0 || nx2 >= N || ny2 < 0 || ny2 >= M) {
      answer = Math.min(answer, cnt + 1);
      return;
    }

    const boardX = board[nx1][ny1];
    const boardY = board[nx2][ny2];

    if (boardX === "#" && boardY === "#") continue;

    if (boardX === "#") {
      dfs(cnt + 1, x1, y1, x2 + dirX, y2 + dirY);
    } else if (boardY === "#") {
      dfs(cnt + 1, x1 + dirX, y1 + dirY, x2, y2);
    } else {
      dfs(cnt + 1, x1 + dirX, y1 + dirY, x2 + dirX, y2 + dirY);
    }
  }
};

let pos = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === "o") {
      pos.push([i, j]);
    }
  }
}

dfs(0, pos[0][0], pos[0][1], pos[1][0], pos[1][1]);

console.log(answer === Number.MAX_SAFE_INTEGER ? -1 : answer);
