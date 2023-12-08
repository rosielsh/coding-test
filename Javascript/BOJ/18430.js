const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const strength = input.map((x) => x.split(" ").map(Number));

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

let maxSum = Number.MIN_SAFE_INTEGER;

const isSelected = Array.from({ length: N }, () => Array(M).fill(false));

const bt = (x, y, sum) => {
  maxSum = Math.max(sum, maxSum);

  if (y === M) {
    y = 0;
    x += 1;
  }

  if (x === N) return;

  // 부메랑을 만들지 않았으면 부메랑 만들기
  if (!isSelected[x][y]) {
    for (let i = 0; i < 4; i++) {
      const [nx1, ny1] = [x + dx[i], y + dy[i]];
      const [nx2, ny2] = [x + dx[(i + 1) % 4], y + dy[(i + 1) % 4]];

      if (nx1 < 0 || nx2 < 0 || nx1 >= N || nx2 >= N) continue;
      if (ny1 < 0 || ny2 < 0 || ny1 >= M || ny2 >= M) continue;

      if (isSelected[nx1][ny1] || isSelected[nx2][ny2]) continue;

      isSelected[nx1][ny1] = true;
      isSelected[nx2][ny2] = true;
      isSelected[x][y] = true;

      bt(
        x,
        y + 1,
        sum + strength[x][y] * 2 + strength[nx1][ny1] + strength[nx2][ny2]
      );

      isSelected[nx1][ny1] = false;
      isSelected[nx2][ny2] = false;
      isSelected[x][y] = false;
    }
  }

  // 부메랑 만들지 않고 지나가기
  bt(x, y + 1, sum);
};

bt(0, 0, 0);

console.log(maxSum);
