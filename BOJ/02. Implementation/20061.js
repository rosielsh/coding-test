// 모노미노도미노 2

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...blockInfo] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
blockInfo = blockInfo.map((x) => x.split(" ").map(Number));

let blueBoard = Array.from({ length: 4 }, () => Array(6).fill(0));
let greenBoard = Array.from({ length: 6 }, () => Array(4).fill(0));
let totalScore = 0;

// 초록색 보드로 이동
function moveGreenBoard(t, r, c) {
  // 1x1 짜리
  if (t === 1) {
    let isExist = false;
    for (let i = 2; i < 6; i++) {
      if (greenBoard[i][c]) {
        greenBoard[i - 1][c] = 1;
        isExist = true;
        break;
      }
    }
    if (!isExist) greenBoard[5][c] = 1;
  }
  // 1x2 짜리
  else if (t === 2) {
    let isExist = false;
    for (let i = 2; i < 6; i++) {
      if (greenBoard[i][c] || greenBoard[i][c + 1]) {
        greenBoard[i - 1][c] = 1;
        greenBoard[i - 1][c + 1] = 1;
        isExist = true;
        break;
      }
    }

    if (!isExist) {
      greenBoard[5][c] = 1;
      greenBoard[5][c + 1] = 1;
    }
  }
  // 2x1 짜리
  else {
    let isExist = false;
    for (let i = 2; i < 6; i++) {
      if (greenBoard[i][c]) {
        greenBoard[i - 1][c] = 1;
        greenBoard[i - 2][c] = 1;
        isExist = true;
        break;
      }
    }

    if (!isExist) {
      greenBoard[5][c] = 1;
      greenBoard[4][c] = 1;
    }
  }
}

// 파란색 보드로 이동
function moveBlueBoard(t, r, c) {
  // 1x1 짜리
  if (t === 1) {
    let isExist = false;
    for (let i = 2; i < 6; i++) {
      if (blueBoard[r][i]) {
        blueBoard[r][i - 1] = 1;
        isExist = true;
        break;
      }
    }

    if (!isExist) {
      blueBoard[r][5] = 1;
    }
  }
  // 1x2 짜리
  else if (t === 2) {
    let isExist = false;
    for (let i = 2; i < 6; i++) {
      if (blueBoard[r][i]) {
        blueBoard[r][i - 1] = 1;
        blueBoard[r][i - 2] = 1;
        isExist = true;
        break;
      }
    }

    if (!isExist) {
      blueBoard[r][5] = 1;
      blueBoard[r][4] = 1;
    }
  }
  // 2x1 짜리
  else {
    let isExist = false;
    for (let i = 2; i < 6; i++) {
      if (blueBoard[r][i] || blueBoard[r + 1][i]) {
        blueBoard[r][i - 1] = 1;
        blueBoard[r + 1][i - 1] = 1;
        isExist = true;
        break;
      }
    }

    if (!isExist) {
      blueBoard[r][5] = 1;
      blueBoard[r + 1][5] = 1;
    }
  }
}

// 두 보드의 특정 행, 열이 가득찼는지 검사
function checkFull() {
  // 초록색
  for (let i = 2; i < 6; i++) {
    let isFull = true;
    for (let j = 0; j < 4; j++) {
      if (!greenBoard[i][j]) isFull = false;
    }

    if (isFull) {
      totalScore++;
      for (let a = i; a >= 1; a--) {
        for (let b = 0; b < 4; b++) {
          greenBoard[a][b] = greenBoard[a - 1][b];
        }
      }
    }
  }
  // 파란색
  for (let i = 2; i < 6; i++) {
    let isFull = true;
    for (let j = 0; j < 4; j++) {
      if (!blueBoard[j][i]) isFull = false;
    }

    if (isFull) {
      totalScore++;
      for (let a = 0; a < 4; a++) {
        for (let b = i; b >= 1; b--) {
          blueBoard[a][b] = blueBoard[a][b - 1];
        }
      }
    }
  }
}

function checkSpecial() {
  // 초록색 검사
  if (greenBoard[0][0] || greenBoard[0][1] || greenBoard[0][2] || greenBoard[0][3]) {
    for (let i = 5; i >= 2; i--) {
      for (let j = 0; j < 4; j++) {
        greenBoard[i][j] = greenBoard[i - 2][j];
      }
    }
  } else if (greenBoard[1][0] || greenBoard[1][1] || greenBoard[1][2] || greenBoard[1][3]) {
    for (let i = 5; i >= 2; i--) {
      for (let j = 0; j < 4; j++) {
        greenBoard[i][j] = greenBoard[i - 1][j];
      }
    }
  }

  greenBoard[0] = [0, 0, 0, 0];
  greenBoard[1] = [0, 0, 0, 0];

  // 파란색 검사

  if (blueBoard[0][0] || blueBoard[1][0] || blueBoard[2][0] || blueBoard[3][0]) {
    for (let i = 0; i < 4; i++) {
      for (let j = 5; j >= 2; j--) {
        blueBoard[i][j] = blueBoard[i][j - 2];
      }
    }
  } else if (blueBoard[0][1] || blueBoard[1][1] || blueBoard[2][1] || blueBoard[3][1]) {
    for (let i = 0; i < 4; i++) {
      for (let j = 5; j >= 2; j--) {
        blueBoard[i][j] = blueBoard[i][j - 1];
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      blueBoard[i][j] = 0;
    }
  }
}

function countBoardCnt() {
  let cnt = 0;
  // 초록색
  for (let i = 2; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      if (greenBoard[i][j]) cnt++;
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 2; j < 6; j++) {
      if (blueBoard[i][j]) cnt++;
    }
  }

  return cnt;
}

function solution() {
  let answer;
  for (let i = 0; i < N; i++) {
    // 현재 빨간 보드에 놓는 블록 정보
    [t, y, x] = blockInfo[i];
    moveGreenBoard(t, y, x);
    moveBlueBoard(t, y, x);
    checkFull();
    checkSpecial();
  }

  console.log(totalScore);
  answer = countBoardCnt();
  return answer;
}

console.log(solution());
