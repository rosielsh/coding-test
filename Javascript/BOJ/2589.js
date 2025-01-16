const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1).map((x) => x.split(""));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const bfs = (x, y) => {
  const visited = Array.from({ length: R }, () => Array(C).fill(false));
  visited[x][y] = true;

  let maxDepth = 0;
  const queue = [[x, y, 0]];

  while (queue.length > 0) {
    const [cx, cy, depth] = queue.shift();

    maxDepth = Math.max(depth, maxDepth);

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx >= R || ny < 0 || ny >= C) continue;
      if (visited[nx][ny] || map[nx][ny] === "W") continue;

      visited[nx][ny] = true;
      queue.push([nx, ny, depth + 1]);
    }
  }

  return maxDepth;
};

let answer = 0;

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === "W") continue;
    answer = Math.max(answer, bfs(i, j));
  }
}

console.log(answer);
