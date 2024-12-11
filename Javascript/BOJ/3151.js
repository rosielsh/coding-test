const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let answer = 0;

const lb = (idx, target) => {
  let left = idx;
  let right = N - 1;

  let minIdx = N;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] >= target) {
      right = mid - 1;
      minIdx = Math.min(mid, minIdx);
    } else {
      left = mid + 1;
    }
  }

  return minIdx;
};

const ub = (idx, target) => {
  let left = idx;
  let right = N - 1;

  let minIdx = N;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] > target) {
      right = mid - 1;
      minIdx = Math.min(mid, minIdx);
    } else {
      left = mid + 1;
    }
  }

  return minIdx;
};

for (let i = 0; i < N - 1; i++) {
  for (let j = i + 1; j < N; j++) {
    // arr[i], arr[j] 2개의 수 선택
    const t = -1 * (arr[i] + arr[j]);
    const lbIdx = lb(j + 1, t);
    const ubIdx = ub(j + 1, t);

    answer += ubIdx - lbIdx;
  }
}

console.log(answer);
