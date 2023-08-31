// 안전 영역

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...area] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
area = area.map((arr) => arr.split(" ").map(Number));

let copyArea = [];
let visited = [];
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs(startX, startY, waterHeight) {
  const queue = [[startX, startY]];
  visited[startX][startY] = 1;

  while (queue.length) {
    [curX, curY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      nx = curX + dx[i];
      ny = curY + dy[i];

      if (
        nx < 0 ||
        nx >= N ||
        ny < 0 ||
        ny >= N ||
        visited[nx][ny] ||
        copyArea[nx][ny] <= waterHeight
      )
        continue;

      visited[nx][ny] = 1;
      copyArea[nx][ny] = -1;
      queue.push([nx, ny]);
    }
  }
}

function solution() {
  let answer;

  let minValue = Number.MAX_SAFE_INTEGER;
  let maxValue = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      minValue = Math.min(minValue, area[i][j]);
      maxValue = Math.max(maxValue, area[i][j]);
    }
  }

  let maxSafeAreaCnt = Number.MIN_SAFE_INTEGER;

  for (let k = minValue; k <= maxValue; k++) {
    let totalSafeAreaCnt = 0;
    copyArea = area.map((v) => [...v]);
    visited = Array.from({ length: N }, () => Array(N).fill(0));
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        // 물의 높이인 k보다 높아야 물에 잠기지 않는 안전 영역
        if (copyArea[i][j] > k) {
          bfs(i, j, k);
          totalSafeAreaCnt++;
        }
      }
    }
    maxSafeAreaCnt = Math.max(maxSafeAreaCnt, totalSafeAreaCnt);
  }

  answer = maxSafeAreaCnt === 0 ? 1 : maxSafeAreaCnt;
  return answer;
}

console.log(solution());
