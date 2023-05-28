// 개수 세기

const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let [N, numbers, v] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
numbers = numbers.split(" ").map(Number);
v = +v;

let answer = 0;
numbers.forEach((num) => {
  if (num === v) answer++;
});

console.log(answer);
