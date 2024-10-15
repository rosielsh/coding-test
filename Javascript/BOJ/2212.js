const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const K = +input[1];
const pos = input[2]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

const sub = [];

for (let i = 1; i < N; i++) {
    sub.push(pos[i] - pos[i - 1]);
}

sub.sort((a, b) => b - a).splice(0, K - 1);

console.log(sub.reduce((acc, cur) => acc + cur, 0));
