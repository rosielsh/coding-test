const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const book = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const plus = [];
const minus = [];

for (let i = 0; i < N; i++) {
  if (book[i] > 0) {
    plus.push(book[i]);
  } else minus.push(book[i]);
}

let answer = 0;
for (let i = plus.length - 1; i >= 0; i -= M) {
  answer += plus[i] * 2;
}

for (let i = 0; i < minus.length; i += M) {
  answer -= minus[i] * 2;
}

if (minus.length === 0 || plus.length === 0) {
  if (minus.length === 0) answer -= plus[plus.length - 1];
  if (plus.length === 0) answer += minus[0];
} else {
  if (-1 * minus[0] < plus[plus.length - 1]) {
    answer -= plus[plus.length - 1];
  } else answer += minus[0];
}

console.log(answer);
