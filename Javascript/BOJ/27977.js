const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [L, N, K] = input[0].split(" ").map(Number);
const pos = input[1].split(" ").map(Number);

pos.push(L);

const isPossible = (dist) => {
  let prev = 0;
  let visitCnt = 0;

  for (i = 0; i < N; i++) {
    if (pos[i] - prev <= dist && pos[i + 1] - prev > dist) {
      visitCnt++;
      prev = pos[i];
    }
  }

  if (L - prev <= dist && visitCnt <= K) return true;
  return false;
};

let left = 1;
let right = 200000;
let minValue = right + 1;

while (left <= right) {
  const mid = parseInt((left + right) / 2);

  if (isPossible(mid)) {
    right = mid - 1;
    minValue = Math.min(minValue, mid);
  } else {
    left = mid + 1;
  }
}

console.log(minValue);
