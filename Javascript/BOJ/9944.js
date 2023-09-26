// NxM 보드 완주하기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

let N;
let M;
let board;
let visited;
let tempCnt;

let minLevel = Number.MAX_SAFE_INTEGER;

const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];

function backTracking(x, y, cnt, level) {
  if (cnt === tempCnt) {
    minLevel = Math.min(minLevel, level);
    return;
  }

  for (let i = 0; i < 4; i++) {
    let move = 0; // 한 방향으로 움직인 칸수
    let nx = x;
    let ny = y;

    let lx = x;
    let ly = y;

    // 한쪽 방향으로 쭉 움직이기
    while (1) {
      nx = lx + dx[i];
      ny = ly + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M || visited[nx][ny] || board[nx][ny] === "*") break;

      visited[nx][ny] = 1;
      move++;

      lx = nx;
      ly = ny;
    }

    if (!move) continue;
    backTracking(lx, ly, cnt + move, level + 1);

    // 방문 해제
    for (let m = 0; m < move; m++) {
      visited[lx][ly] = 0;
      lx -= dx[i];
      ly -= dy[i];
    }
  }
}

function solution() {
  let answer = [];
  let tc = 1;
  while (input.length) {
    [N, M] = input.shift().split(" ").map(Number);
    board = input.splice(0, N).map((x) => x.replace("\r", "").split(""));

    tempCnt = 0;
    visited = Array.from({ length: N }, () => Array(M).fill(0));
    minLevel = Number.MAX_SAFE_INTEGER;

    board.forEach((row) => {
      row.forEach((ele) => {
        if (ele === ".") tempCnt++;
      });
    });

    board.forEach((row, i) => {
      row.forEach((ele, j) => {
        if (ele === ".") {
          visited[i][j] = 1;
          backTracking(i, j, 1, 0);
          visited[i][j] = 0;
        }
      });
    });

    answer.push(`Case ${tc++}: ${minLevel === Number.MAX_SAFE_INTEGER ? -1 : minLevel}`);
  }

  return answer.join("\n");
}

console.log(solution());
