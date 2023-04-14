// 영역 구하기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [M, N, K] = input.shift().split(" ").map(Number);
const square = input.map((x) => x.split(" ").map(Number));
const area = Array.from({ length: M }, () => Array(N).fill(0));

for (let k = 0; k < K; k++) {
  [x1, y1, x2, y2] = square[k];
  for (let i = M - y2; i < M - y1; i++) {
    for (let j = x1; j < x2; j++) {
      if (!area[i][j]) area[i][j] = 1;
    }
  }
}

function bfs(r, c) {
  const needVisit = [[r, c]];
  const pos = [
    [1, 0],
    [-1, 0],
    [0, -1],
    [0, 1],
  ];
  let cnt = 0;

  while (needVisit.length) {
    const [curY, curX] = needVisit.shift();

    for (let i = 0; i < 4; i++) {
      const [adjY, adjX] = [curY + pos[i][0], curX + pos[i][1]];
      if (adjY < 0 || adjY >= M || adjX < 0 || adjX >= N) continue;
      if (!area[adjY][adjX]) {
        area[adjY][adjX] = 1;
        needVisit.push([adjY, adjX]);
        cnt++;
      }
    }
  }
  return cnt;
}

function solution() {
  let answer = [];
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (area[i][j]) continue;
      result = bfs(i, j);
      answer.push(result === 0 ? 1 : result);
    }
  }
  console.log(answer.length);
  return answer.sort((a, b) => a - b).join(" ");
}

console.log(solution());
