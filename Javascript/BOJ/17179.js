const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M, L] = input[0].split(" ").map(Number);
const cut = input.slice(1, M + 1).map(Number);
const count = input.slice(M + 1).map(Number);

cut.push(L);

const possible = (mid, count) => {
  let cnt = 0;
  let cur = 0;

  for (let i = 0; i <= M; i++) {
    if (cut[i] - cur >= mid) {
      cur = cut[i];
      cnt++;
    }
  }

  if (cnt - 1 >= count) return true;
  return false;
};

const lb = (count) => {
  let left = 2;
  let right = L;
  let max = 1;

  while (left <= right) {
    const mid = parseInt((left + right) / 2);

    if (possible(mid, count)) {
      left = mid + 1;
      max = Math.max(max, mid);
    } else {
      right = mid - 1;
    }
  }

  return max;
};

const answer = [];

for (let c of count) {
  answer.push(lb(c));
}

console.log(answer.join("\n"));
