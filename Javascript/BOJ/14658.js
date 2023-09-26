// 하늘에서 별똥별이 빗발친다

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

[N, M, L, K] = input[0].split(" ").map(Number);
starPos = input.slice(1).map((x) => x.split(" ").map(Number));

function setTrampoline(startX, startY) {
  let cnt = 0;

  for (let i = 0; i < K; i++) {
    if (
      starPos[i][0] >= startX &&
      starPos[i][0] <= startX + L &&
      starPos[i][1] >= startY &&
      starPos[i][1] <= startY + L
    )
      cnt++;
  }

  return cnt;
}

function solution() {
  let answer;

  // 최대로 트램펄린과 겹치는 별똥별 수
  let maxStar = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < K; i++) {
    for (let j = 0; j < K; j++) {
      maxStar = Math.max(setTrampoline(starPos[i][0], starPos[j][1]), maxStar);
    }
  }

  answer = K - maxStar;
  return answer;
}

console.log(solution());
