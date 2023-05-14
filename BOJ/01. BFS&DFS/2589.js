// 보물섬

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [RC, ...map] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [r, c] = RC.split(" ").map(Number);
map = map.map((x) => x.split(""));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(x, y) {
  const queue = [[x, y, 0]];
  const visited = Array.from({ length: r }, () => Array(c).fill(0));
  visited[x][y] = 1;

  let maxDist = Number.MIN_SAFE_INTEGER;

  while (queue.length) {
    const [cx, cy, dist] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx >= r || ny < 0 || ny >= c || visited[nx][ny] || map[nx][ny] === "W")
        continue;

      visited[nx][ny] = 1;
      maxDist = Math.max(maxDist, dist + 1);
      queue.push([nx, ny, dist + 1]);
    }
  }

  return maxDist;
}

function solution() {
  let answer;
  let maxValue = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (map[i][j] === "L") {
        maxValue = Math.max(maxValue, bfs(i, j));
      }
    }
  }

  answer = maxValue === Number.MIN_SAFE_INTEGER ? 0 : maxValue;
  return answer;
}

console.log(solution());
