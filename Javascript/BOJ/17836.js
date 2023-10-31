const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

// 용사가 T시간 이하로 공주를 만나면 구출 가능
// 그람을 구하면 벽을 무한대로 부술 수 있음
const [N, M, T] = input.shift().split(" ").map(Number);
const palace = input.map((x) => x.split(" ").map(Number));

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs() {
  const queue = [[0, 0, 0, 0]];
  const visited = Array.from({ length: 2 }, () =>
    Array.from({ length: N }, () => Array(M).fill(0))
  );

  // 검을 먹지 않고 0, 0에 방문 체크
  visited[0][0][0] = 1;

  while (queue.length) {
    const [cx, cy, time, hasGun] = queue.shift();

    if (time > T) continue;

    if (cx === N - 1 && cy === M - 1) {
      return time;
    }

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

      // 만약 검을 만나면 검을 먹자
      if (!hasGun && palace[nx][ny] === 2 && !visited[1][nx][ny]) {
        visited[1][nx][ny] = time + 1;
        queue.push([nx, ny, time + 1, 1]);
        continue;
      }

      // 다음이 벽이라면
      if (palace[nx][ny] === 1) {
        if (!hasGun) continue;

        if (hasGun && !visited[1][nx][ny]) {
          visited[1][nx][ny] = time + 1;
          queue.push([nx, ny, time + 1, 1]);
          continue;
        }
      }

      // 다음이 그냥 공간이라면
      if (!visited[hasGun][nx][ny]) {
        visited[hasGun][nx][ny] = time + 1;
        queue.push([nx, ny, time + 1, hasGun]);
      }
    }
  }

  return -1;
}

const res = bfs();
console.log(res === -1 ? "Fail" : res);
