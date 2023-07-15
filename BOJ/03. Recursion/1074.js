const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, R, C] = require("fs").readFileSync(filePath).toString().trim().split(" ").map(Number);

let cnt = 0;

function search(size, r, c) {
  if (size === 1) {
    console.log(cnt);
    return;
  }

  const nextSize = parseInt(size / 2);

  // 왼쪽 위
  if (R < r + nextSize && C < c + nextSize) {
    search(nextSize, r, c);
  }
  // 오른쪽 위
  else if (R < r + nextSize && C >= c + nextSize) {
    cnt += nextSize * nextSize;
    search(nextSize, r, c + nextSize);
  }
  // 왼쪽 아래
  else if (R >= r + nextSize && C < c + nextSize) {
    cnt += nextSize * nextSize * 2;
    search(nextSize, r + nextSize, c);
  }
  // 오른쪽 아래
  else if (R >= r + nextSize && C >= c + nextSize) {
    cnt += nextSize * nextSize * 3;
    search(nextSize, r + nextSize, c + nextSize);
  }
}

search(2 ** N, 0, 0);
