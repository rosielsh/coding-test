const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M, L] = input[0].split(" ").map(Number);

let pos = [];
if (N > 0) {
  pos = input[1].split(" ").map(Number);
}

pos.unshift(0);
pos.push(L);

pos.sort((a, b) => a - b);

const isPossible = (dist) => {
  let cnt = 0;

  for (let i = 1; i < pos.length; i++) {
    const sub = pos[i] - pos[i - 1];

    cnt += Math.floor(sub / dist);
    if (sub % dist === 0) cnt--;
  }

  return cnt <= M;
};

let left = 1;
let right = L;
let minValue = right + 1;

while (left <= right) {
  const mid = parseInt((left + right) / 2);

  if (isPossible(mid)) {
    right = mid - 1;
    minValue = mid;
  } else {
    left = mid + 1;
  }
}

console.log(minValue);
