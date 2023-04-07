// 그림

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, ...paper] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[N, M] = NM.split(" ").map(Number);
paper = paper.map((x) => x.split(" ").map(Number));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs(startX, startY) {
  const queue = [[startX, startY]];
  let cnt = 1;
  paper[startX][startY] = 0;

  while (queue.length) {
    [curX, curY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      nx = curX + dx[i];
      ny = curY + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M || !paper[nx][ny]) continue;

      paper[nx][ny] = 0;
      queue.push([nx, ny]);
      cnt++;
    }
  }

  return cnt;
}

function solution() {
  let answer = "";
  let paperSize = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (paper[i][j]) {
        paperSize.push(bfs(i, j));
      }
    }
  }

  answer += `${paperSize.length}\n`;
  answer += `${Math.max(...paperSize)}`;

  if (!paperSize.length) return "0\n0";

  return answer;
}

console.log(solution());
