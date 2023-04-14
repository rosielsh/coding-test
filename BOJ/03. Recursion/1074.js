// Z

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, r, c] = require("fs").readFileSync(filePath).toString().trim().split(" ");
let cnt = 0;

function solution(y, x, size) {
  if (size === 1) {
    return;
  }

  let nextSize = parseInt(size / 2);
  if (r < y + nextSize && c < x + nextSize) {
    solution(y, x, nextSize);
  } else if (r < y + nextSize && c >= x + nextSize) {
    cnt += ((size * size) / 4) * 1;
    solution(y, x + nextSize, nextSize);
  } else if (r >= y + nextSize && c < x + nextSize) {
    cnt += ((size * size) / 4) * 2;
    solution(y + nextSize, x, nextSize);
  } else {
    cnt += ((size * size) / 4) * 3;
    solution(y + nextSize, x + nextSize, nextSize);
  }
  return cnt;
}

console.log(solution(0, 0, 2 ** N));
