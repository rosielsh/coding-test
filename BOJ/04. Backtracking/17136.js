// 색종이 붙이기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const paper = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((x) => x.split(" ").map(Number));

function checkCover(x, y, size) {
  if (x + size > 10 || y + size > 10) return false;

  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (!paper[i][j]) return false;
    }
  }
  return true;
}

function cover(x, y, size) {
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      paper[i][j] = 0;
    }
  }
}

function uncover(x, y, size) {
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      paper[i][j] = 1;
    }
  }
}

const paperCntArr = Array.from({ length: 6 }, () => 5);
paperCntArr[0] = 0;

let minValue = Number.MAX_SAFE_INTEGER;

function backTracking(x, y, paperCnt) {
  if (x >= 9 && y > 9) {
    minValue = Math.min(minValue, paperCnt);
    return;
  }

  if (minValue <= paperCnt) return;

  if (y > 9) {
    backTracking(x + 1, 0, paperCnt);
    return;
  }

  // 1이면 종이 붙여보기
  if (paper[x][y]) {
    for (let size = 5; size >= 1; size--) {
      if (paperCntArr[size] > 0 && checkCover(x, y, size)) {
        cover(x, y, size);
        paperCntArr[size]--;
        backTracking(x, y + 1, paperCnt + 1);
        uncover(x, y, size);
        paperCntArr[size]++;
      }
    }
  } else backTracking(x, y + 1, paperCnt);
}

function solution() {
  let answer;
  backTracking(0, 0, 0);

  answer = minValue === Number.MAX_SAFE_INTEGER ? -1 : minValue;
  return answer;
}

console.log(solution());
