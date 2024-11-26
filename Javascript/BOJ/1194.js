const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((x) => x.split(""));

const visited = Array.from({ length: 64 }, () => Array.from({ length: N }, () => Array(M).fill(false)));

let start = [0, 0];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === "0") {
      start[0] = i;
      start[1] = j;
    }
  }
}

const keys = ["f", "e", "d", "c", "b", "a"];
const doors = ["F", "E", "D", "C", "B", "A"];

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

let answer = -1;
const queue = [[...start, 0, 0]];

visited[0][start[0]][start[1]] = true;

while (queue.length > 0) {
  const [x, y, cnt, key] = queue.shift();

  if (map[x][y] === "1") {
    answer = cnt;
    break;
  }

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
    if (map[nx][ny] === "#" || visited[key][nx][ny]) continue;

    if (keys.includes(map[nx][ny])) {
      const val = 1 << keys.indexOf(map[nx][ny]);
      const nextKey = key | val;

      if (visited[nextKey][nx][ny]) continue;
      visited[nextKey][nx][ny] = cnt + 1;

      queue.push([nx, ny, cnt + 1, nextKey]);
      continue;
    }

    if (doors.includes(map[nx][ny])) {
      const door = 1 << doors.indexOf(map[nx][ny]);
      const possibleOpen = door & key;

      if (possibleOpen > 0) {
        visited[key][nx][ny] = true;
        queue.push([nx, ny, cnt + 1, key]);
      }

      continue;
    }

    visited[key][nx][ny] = 1;
    queue.push([nx, ny, cnt + 1, key]);
  }
}

console.log(answer);
