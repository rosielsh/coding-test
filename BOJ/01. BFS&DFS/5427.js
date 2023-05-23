// 불

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [T, ...input] = require("fs").readFileSync(filePath).toString().trim().split("\n");

let h;
let w;
let map;

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function bfs(x, y, fire) {
  const fQueue = [...fire]; // 불을 관리하는 큐
  const sQueue = [[x, y, 0]]; // 상근이의 위치를 관리하는 큐

  let fLen = fQueue.length;
  let sLen = sQueue.length;

  let fptr = 0;
  let sptr = 0;

  let time = 0;

  while (fptr < fQueue.length || sptr < sQueue.length) {
    fLen = fQueue.length;
    for (let i = fptr; i < fLen; i++) {
      const [fx, fy] = fQueue[i];

      for (let i = 0; i < 4; i++) {
        const nx = fx + dx[i];
        const ny = fy + dy[i];

        // 불은 벽 or 불으로 이동 x
        if (nx < 0 || nx >= h || ny < 0 || ny >= w || map[nx][ny] === "#" || map[nx][ny] === "*")
          continue;

        map[nx][ny] = "*";
        fQueue.push([nx, ny]);
      }
    }

    fptr = fLen;

    sLen = sQueue.length;
    for (let i = sptr; i < sLen; i++) {
      const [sx, sy] = sQueue[i];

      for (let i = 0; i < 4; i++) {
        const nx = sx + dx[i];
        const ny = sy + dy[i];

        if (nx < 0 || nx >= h || ny < 0 || ny >= w) {
          return time + 1;
        }

        // 벽이나 불은 지나갈 수 x
        if (map[nx][ny] === "#" || map[nx][ny] === "*" || map[nx][ny] === "@") continue;

        map[nx][ny] = "@";
        sQueue.push([nx, ny]);
      }
    }

    sptr = sLen;

    time++;
  }

  return 0;
}

function solution() {
  let answer = [];

  for (let i = 0; i < T; i++) {
    [w, h] = input.shift().split(" ").map(Number);
    map = input.splice(0, h).map((x) => x.replace("\r", "").split(""));

    const firePos = [];
    const sgPos = [];

    map.forEach((row, i) => {
      row.forEach((ele, j) => {
        if (ele === "*") {
          firePos.push([i, j]);
        }

        if (ele === "@") {
          sgPos[0] = i;
          sgPos[1] = j;
        }
      });
    });

    const time = bfs(sgPos[0], sgPos[1], firePos);
    answer.push(time === 0 ? "IMPOSSIBLE" : time);
  }

  return answer.join("\n");
}

console.log(solution());
