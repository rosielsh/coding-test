// 미세먼지 안녕!

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[RCT, ...home] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[R, C, T] = RCT.split(" ").map(Number);
home = home.map((x) => x.split(" ").map(Number));

const airCleanerRow = [];

function getMisePos() {
  const pos = [];
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (home[i][j] > 0) pos.push([i, j]);
      if (home[i][j] === -1) airCleanerRow.push(i);
    }
  }
  return pos;
}

// 좌 우 상 하
let dy = [0, 0, -1, 1];
let dx = [-1, 1, 0, 0];

function spreadMise(pos) {
  // 현재 집 상태 복사
  const copyHome = home.map((v) => [...v]);
  // 좌표 하나씩 확산
  for (let i = 0; i < pos.length; i++) {
    curY = pos[i][0];
    curX = pos[i][1];
    let direction = [0, 0, 0, 0];
    let cnt = 0;

    for (let j = 0; j < 4; j++) {
      ny = curY + dy[j];
      nx = curX + dx[j];

      if (ny < 0 || ny >= R || nx < 0 || nx >= C || home[ny][nx] === -1) continue;
      direction[j] = 1;
      cnt++;
    }

    if (!cnt) continue;
    else {
      const spread = parseInt(home[curY][curX] / 5);
      copyHome[curY][curX] -= spread * cnt;
      for (let i = 0; i < 4; i++) {
        if (direction[i]) {
          copyHome[curY + dy[i]][curX + dx[i]] += spread;
        }
      }
    }
  }
  // 연산 후 home 상태 갱신
  home = copyHome.map((v) => [...v]);
}

function turnOnAirCleaner() {
  let topSideRow = airCleanerRow[0];
  let bottomSideRow = airCleanerRow[1];

  const copyHome = home.map((v) => [...v]);

  // 좌 -> 우 이동
  copyHome[topSideRow][1] = 0;
  copyHome[bottomSideRow][1] = 0;

  for (let i = 2; i < C; i++) {
    copyHome[topSideRow][i] = home[topSideRow][i - 1];
    copyHome[bottomSideRow][i] = home[bottomSideRow][i - 1];
  }

  // 우 -> 좌 이동
  for (let i = C - 2; i >= 0; i--) {
    copyHome[0][i] = home[0][i + 1];
    copyHome[R - 1][i] = home[R - 1][i + 1];
  }

  // 오른쪽 처리
  for (let i = topSideRow - 1; i >= 0; i--) {
    copyHome[i][C - 1] = home[i + 1][C - 1];
  }

  for (let i = bottomSideRow + 1; i < R; i++) {
    copyHome[i][C - 1] = home[i - 1][C - 1];
  }

  // 왼쪽 처리
  for (let i = 1; i < topSideRow; i++) {
    copyHome[i][0] = home[i - 1][0];
  }

  for (let i = R - 2; i > bottomSideRow; i--) {
    copyHome[i][0] = home[i + 1][0];
  }

  home = copyHome.map((v) => [...v]);
}

function calcRemainMise() {
  let sum = 0;
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (home[i][j] > 0) sum += home[i][j];
    }
  }
  return sum;
}

function solution() {
  let answer;
  // T초 동안 반복
  for (let i = 0; i < T; i++) {
    // 현재 미세먼지 좌표 받기
    const pos = getMisePos();
    // 받아온 좌표에 대해서 미세먼지 확산
    spreadMise(pos);
    // 공기청정기 작동
    turnOnAirCleaner();
  }

  answer = calcRemainMise();
  return answer;
}

console.log(solution());
