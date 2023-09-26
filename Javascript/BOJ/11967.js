// 불 켜기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [NM, ...switches] = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = NM.split(" ").map(Number);

const barn = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
const movePos = new Map();
const candidate = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0)); // 이전에 인접한 곳 중 방문한 적이 있는지 확인

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
const visited = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));
visited[1][1] = 1;

function bfs() {
  const queue = [[1, 1]];
  barn[1][1] = 1;

  let cnt = 1;

  while (queue.length) {
    const [x, y] = queue.shift();

    // 현재 위치에서 켤 수 있는 방 다 켜기
    if (movePos.has(`${x} ${y}`)) {
      const turnOnBarn = movePos.get(`${x} ${y}`);

      for (let i = 0; i < turnOnBarn.length; i++) {
        const [nx, ny] = turnOnBarn[i];

        if (barn[nx][ny]) continue;

        if (candidate[nx][ny]) queue.push([nx, ny]); // 만약에 불이 꺼져있는데 이전에 방문했었다면 ? -> 얘도 재방문 해야함
        barn[nx][ny] = 1;
        cnt++;
      }
    }

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 1 || nx > N || ny < 1 || ny > N) continue;

      candidate[nx][ny] = 1;

      if (visited[nx][ny] || !barn[nx][ny]) continue;

      visited[nx][ny] = 1;
      queue.push([nx, ny]);
    }
  }

  return cnt;
}

function solution() {
  let answer;
  let maxValue = 0;

  for (let i = 0; i < M; i++) {
    const [x, y, a, b] = switches[i].split(" ").map(Number);
    if (movePos.has(`${x} ${y}`)) {
      const result = movePos.get(`${x} ${y}`);
      movePos.set(`${x} ${y}`, [...result, [a, b]]);
    } else movePos.set(`${x} ${y}`, [[a, b]]);
  }

  maxValue = Math.max(maxValue, bfs());

  answer = maxValue;
  return answer;
}

console.log(solution());
