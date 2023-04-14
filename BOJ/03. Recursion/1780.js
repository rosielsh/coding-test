// 종이의 개수

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...paper] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
paper = paper.map((x) => x.split(" ").map(Number));

let minus = 0;
let zero = 0;
let plus = 0;

function solution(startY, startX, len) {
  if (len === 1) {
    if (paper[startY][startX] === -1) minus += 1;
    else if (paper[startY][startX] === 0) zero += 1;
    else plus += 1;
    return;
  }

  let std = paper[startY][startX];
  let flag = true;
  for (let i = startY; i <= startY + len - 1; i++) {
    for (let j = startX; j <= startX + len - 1; j++) {
      if (paper[i][j] !== std) flag = false;
    }
  }

  if (flag) {
    if (std === -1) minus += 1;
    else if (std === 0) zero += 1;
    else plus += 1;
    return;
  }

  let nextLen = parseInt(len / 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      solution(startY + nextLen * i, startX + nextLen * j, nextLen);
    }
  }
}

solution(0, 0, N);
console.log(`${minus}\n${zero}\n${plus}`);
