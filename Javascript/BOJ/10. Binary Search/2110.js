// 공유기 설치

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, C] = input.shift().split(" ").map(Number);
const house = input.map(Number).sort((a, b) => a - b);

function isPossible(dist) {
  let cnt = 1;
  let std = house[0];
  for (let i = 1; i <= N; i++) {
    if (dist <= house[i] - std) {
      cnt++;
      std = house[i];
    }
  }
  return cnt >= C ? true : false;
}

function solution() {
  let left = 1;
  let right = house[N - 1] - house[0];
  let mid;

  while (left <= right) {
    mid = parseInt((left + right) / 2);
    if (isPossible(mid)) {
      left = mid + 1;
    } else right = mid - 1;
  }
  return right;
}

console.log(solution());
