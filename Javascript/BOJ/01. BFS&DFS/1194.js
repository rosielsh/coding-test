// 달이 차오른다, 가자.

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [NM, ...miro] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = NM.split(" ").map(Number);
miro = miro.map((x) => x.replace("\r", "").split(""));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(x, y) {
  const visited = Array.from({ length: 64 }, () =>
    Array.from({ length: N }, () => Array(M).fill(0))
  );
  const queue = [[x, y, 0, 0]];
  visited[0][x][y] = 1;

  while (queue.length) {
    let [cx, cy, dist, key] = queue.shift();

    // 탈출
    if (miro[cx][cy] === "1") return dist;

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + cx;
      const ny = dy[i] + cy;

      if (nx < 0 || nx >= N || ny < 0 || ny >= M || miro[nx][ny] === "#" || visited[key][nx][ny])
        continue;

      // 키
      if (miro[nx][ny].charCodeAt(0) >= 97 && miro[nx][ny].charCodeAt(0) <= 102) {
        let nextKey = 1 << (miro[nx][ny].charCodeAt(0) - 97);
        nextKey = key | nextKey;
        if (visited[nextKey][nx][ny]) continue; // 다음 키를 추가한 상태에서 방문한 적이 있으면 pass
        visited[nextKey][nx][ny] = 1;
        queue.push([nx, ny, dist + 1, nextKey]);
      }

      // 문
      else if (miro[nx][ny].charCodeAt(0) >= 65 && miro[nx][ny].charCodeAt(0) <= 70) {
        const door = 1 << (miro[nx][ny].charCodeAt(0) - 65);
        if ((door & key) > 0) {
          visited[key][nx][ny] = 1;
          queue.push([nx, ny, dist + 1, key]);
        }
      }

      // .
      else {
        visited[key][nx][ny] = 1;
        queue.push([nx, ny, dist + 1, key]);
      }
    }
  }
  return -1;
}

function solution() {
  let answer;
  miro.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col === "0") answer = bfs(i, j);
    });
  });

  return answer;
}

console.log(solution());
