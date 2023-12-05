const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, K, R] = input.shift().split(" ").map(Number);
const roadInfo = input.splice(0, R).map((x) => x.split(" ").map(Number));
const cow = input.map((x) => x.split(" ").map(Number));
const road = Array.from({ length: N }, () => Array(N).fill([]));

for (let i = 0; i < R; i++) {
  const [a, b, c, d] = roadInfo[i];
  road[a - 1][b - 1] = [...road[a - 1][b - 1], [c - 1, d - 1]];
  road[c - 1][d - 1] = [...road[c - 1][d - 1], [a - 1, b - 1]];
}

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

const bfs = (x, y) => {
  const queue = [[x, y]];
  visited[x][y] = true;

  while (queue.length) {
    const [cx, cy] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
      if (visited[nx][ny]) continue;

      const target = [nx, ny];

      // 갈려는 곳이 길이면 pass
      let exist = road[cx][cy].some((subArr) =>
        subArr.every((val, idx) => val === target[idx])
      );

      if (exist) continue;

      visited[nx][ny] = true;
      queue.push([nx, ny]);
    }
  }
};

let visited;
let answer = 0; // 소가 길이 아닌 곳으로 이동했을 때 만나는 소의 수

for (let i = 0; i < K; i++) {
  visited = Array.from({ length: N }, () => Array(N).fill(false));

  bfs(cow[i][0] - 1, cow[i][1] - 1);

  for (let k = 0; k < K; k++) {
    const [cx, cy] = cow[k];

    if (!visited[cx - 1][cy - 1]) {
      answer++;
    }
  }
}

console.log(Number.parseInt(answer / 2));
