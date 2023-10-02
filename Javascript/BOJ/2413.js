const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const T = +input[0];
const N = +input[1];
const A = input[2].split(" ").map(Number);
const M = +input[3];
const B = input[4].split(" ").map(Number);

const aSum = [];
const bSum = [];
const map = new Map();

for (let i = 0; i < N; i++) {
  let sum = 0;
  for (let j = i; j < N; j++) {
    sum += A[j];
    aSum.push(sum);
  }
}

for (let i = 0; i < M; i++) {
  let sum = 0;
  for (let j = i; j < M; j++) {
    sum += B[j];
    bSum.push(sum);

    if (map.has(sum)) {
      map.set(sum, map.get(sum) + 1);
    } else {
      map.set(sum, 1);
    }
  }
}

let answer = 0;
for (let i = 0; i < aSum.length; i++) {
  const target = T - aSum[i];
  if (map.has(target)) {
    answer += map.get(target);
  }
}

console.log(answer);
