const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const G = +input[0];

const arr = Array.from({ length: G + 1 }, (_, idx) => idx);

const answer = [];

let left = 1;
let right = 1;

while (right < G) {
  const sub = arr[right] ** 2 - arr[left] ** 2;

  if (sub < G) {
    right++;
  } else if (sub > G) {
    left++;
  } else if (sub === G) {
    answer.push(right);
    right++;
  }
}

console.log(answer.length === 0 ? -1 : answer.sort((a, b) => a - b).join("\n"));
