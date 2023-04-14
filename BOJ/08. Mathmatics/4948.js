// 베르트랑 공준

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n").map(Number);
let arr;

function prime(n) {
  let answer = 0;
  arr = Array.from({ length: 2 * n + 1 }, (_, idx) => idx);

  if (n === 1) return 1;

  for (let i = 2; i <= 2 * n; i++) {
    if (!arr[i]) continue;

    for (let j = i * 2; j <= 2 * n; j += i) {
      arr[j] = 0;
    }
  }

  for (let i = n + 1; i <= 2 * n; i++) {
    if (arr[i] === 0 || arr[i] === 1) continue;
    answer++;
  }

  return answer;
}

function solution() {
  let n;
  while (true) {
    n = input.shift();
    if (!n) break;
    console.log(prime(n));
  }
}

solution();
