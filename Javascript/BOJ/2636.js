// 치즈

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [NM, ...board] = require("fs").readFileSync(filePath).toString().trim().split("\n");
let [N, M] = NM.split(" ").map(Number);
board = board.map((x) => x.split(" ").map(Number));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(x, y) {
  const queue = [[x, y]];
  const visited = Array.from({ length: N }, () => Array(M).fill(0));

  while (queue.length) {
    const [cx, cy] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M || board[nx][ny] === 1 || visited[nx][ny])
        continue;

      board[nx][ny] = 2;
      visited[nx][ny] = 1;
      queue.push([nx, ny]);
    }
  }
}

function calcCheeze() {
  let cnt = 0;
  board.forEach((row) => {
    row.forEach((col) => {
      if (col === 1) cnt++;
    });
  });
  return cnt;
}

function solution() {
  let answer = "";

  let cheezeCnt = calcCheeze();
  let time = 0;

  while (1) {
    const cnt = calcCheeze();
    if (cnt === 0) break;

    bfs(0, 0);

    const visited = Array.from({ length: N }, () => Array(M).fill(0));

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (board[i][j] === 2 && !visited[i][j]) {
          for (let k = 0; k < 4; k++) {
            const nx = i + dx[k];
            const ny = j + dy[k];

            if (nx < 0 || nx >= N || ny < 0 || ny >= M || visited[nx][ny]) continue;

            if (board[nx][ny] === 1) {
              visited[nx][ny] = 1;
              board[nx][ny] = 2; // 녹이기
            }
          }
        }
      }
    }

    time++;
    cheezeCnt = cnt;
  }

  answer = `${time}\n${cheezeCnt}`;
  return answer;
}

console.log(solution());
