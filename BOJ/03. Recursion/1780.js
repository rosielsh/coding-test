// 종이의 개수

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N, ...paper] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
paper = paper.map((x) => x.split(" ").map(Number));

function checkIsSame(x, y, size) {
  let std = paper[x][y];
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      if (paper[i][j] !== std) return false;
    }
  }

  return true;
}

const cnt = Array.from({ length: 3 }, () => 0);

function search(r, c, size) {
  if (size === 0) {
    return;
  }

  if (checkIsSame(r, c, size)) {
    if (paper[r][c] === -1) {
      cnt[0]++;
    } else if (paper[r][c] === 0) {
      cnt[1]++;
    } else {
      cnt[2]++;
    }
    return;
  }

  const nextSize = parseInt(size / 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const nr = r + nextSize * i;
      const nc = c + nextSize * j;

      search(nr, nc, nextSize);
    }
  }
}

function solution() {
  let answer;
  search(0, 0, N);
  answer = cnt.join("\n");
  return answer;
}

console.log(solution());
