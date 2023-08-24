// 귀여운 라이언

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NK, doll] = require("fs").readFileSync(filePath).toString().trim().split("\n");
[N, K] = NK.split(" ").map(Number);
doll = doll.split(" ").map(Number);

function solution() {
  let lionCnt = 0;
  let subSetLen = Number.MAX_SAFE_INTEGER;

  let left = 0;
  let right = 0;

  // 0번 인덱스에 라이언이 있으면 갯수 + 1
  if (doll[left] === 1) lionCnt++;

  while (right < N) {
    // 라이언 갯수가 목표 갯수라면
    if (lionCnt === K) {
      // 부분 집합 길이 갱신
      subSetLen = Math.min(subSetLen, right - left + 1);
      if (doll[left] === 1) lionCnt--;
      left++;
      continue;
    }
    // 라이언 갯수가 목표 갯수보다 적다면
    right++;

    // right 좌표가 라이언이면 갯수 + 1
    if (doll[right] === 1) lionCnt++;
  }

  return subSetLen === Number.MAX_SAFE_INTEGER ? -1 : subSetLen;
}

console.log(solution());
