// 상범 빌딩

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

let L;
let R;
let C;
let building;

const dx = [0, 0, -1, 1, 0, 0];
const dy = [-1, 1, 0, 0, 0, 0];
const dz = [0, 0, 0, 0, -1, 1];

function bfs(x, y, z) {
  const queue = [[x, y, z, 0]];
  const visited = Array.from({ length: L }, () =>
    Array.from({ length: R }, () => Array(C).fill(0))
  );

  visited[x][y][z] = 1;

  while (queue.length) {
    const [cx, cy, cz, time] = queue.shift();

    if (building[cx][cy][cz] === "E") return time;

    for (let i = 0; i < 6; i++) {
      const nx = dx[i] + cx;
      const ny = dy[i] + cy;
      const nz = dz[i] + cz;

      if (
        nx < 0 ||
        nx >= L ||
        ny < 0 ||
        ny >= R ||
        nz < 0 ||
        nz >= C ||
        visited[nx][ny][nz] ||
        building[nx][ny][nz] === "#"
      )
        continue;

      visited[nx][ny][nz] = 1;
      queue.push([nx, ny, nz, time + 1]);
    }
  }
  return -1;
}

function solution() {
  let answer = [];

  while (1) {
    [L, R, C] = input.shift().split(" ").map(Number);
    if (L === 0 && R === 0 && C === 0) break;
    building = Array.from({ length: L }, () => 0);

    for (let i = 0; i < L; i++) {
      const floor = input.splice(0, R).map((x) => x.replace("\r", "").split(""));
      building[i] = floor;
      input.shift();
    }

    let time;
    for (let i = 0; i < L; i++) {
      for (let j = 0; j < R; j++) {
        for (let k = 0; k < C; k++) {
          if (building[i][j][k] === "S") {
            time = bfs(i, j, k);
            break;
          }
        }
      }
    }

    answer.push(time === -1 ? "Trapped!" : `Escaped in ${time} minute(s).`);
  }

  return answer.join("\n");
}

console.log(solution());
