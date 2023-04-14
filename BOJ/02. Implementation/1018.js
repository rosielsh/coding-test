// 체스판 다시 칠하기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const chess = input.map((x) => x.replace("\r", ""));

const blackFirst = [
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
];

const whiteFirst = [
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
  "WBWBWBWB",
  "BWBWBWBW",
];

function checkWhite(i, j) {
  let cnt = 0;
  for (let a = 0; a < 8; a++) {
    for (let b = 0; b < 8; b++) {
      if (whiteFirst[a][b] !== chess[a + i][b + j]) cnt++;
    }
  }
  return cnt;
}

function checkBlack(i, j) {
  let cnt = 0;
  for (let a = 0; a < 8; a++) {
    for (let b = 0; b < 8; b++) {
      if (blackFirst[a][b] !== chess[a + i][b + j]) cnt++;
    }
  }
  return cnt;
}

function solution() {
  let answer = Number.MAX_SAFE_INTEGER;
  let cnt = 0;
  for (let i = 0; i <= N - 8; i++) {
    for (let j = 0; j <= M - 8; j++) {
      cnt = 0;
      cnt += Math.min(checkWhite(i, j), checkBlack(i, j));
      answer = Math.min(answer, cnt);
    }
  }
  return answer;
}

console.log(solution());
