const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const egg = input.map((x) => x.split(" ").map(Number));

let maxCnt = Number.MIN_SAFE_INTEGER;

function bt(depth, brokeCnt) {
  if (depth === N) {
    maxCnt = Math.max(maxCnt, brokeCnt);
    return;
  }

  if (brokeCnt === N - 1 || egg[depth][0] <= 0) {
    maxCnt = Math.max(maxCnt, brokeCnt);
    bt(depth + 1, brokeCnt);
    return;
  }

  let cCnt = brokeCnt;
  for (let i = 0; i < N; i++) {
    if (depth === i || egg[i][0] <= 0) continue;

    egg[depth][0] -= egg[i][1];
    egg[i][0] -= egg[depth][1];

    if (egg[depth][0] <= 0) {
      cCnt++;
    }

    if (egg[i][0] <= 0) {
      cCnt++;
    }

    bt(depth + 1, cCnt);

    egg[depth][0] += egg[i][1];
    egg[i][0] += egg[depth][1];
    cCnt = brokeCnt;
  }
}

bt(0, 0);
console.log(maxCnt === Number.MIN_SAFE_INTEGER ? 0 : maxCnt);
