const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);
const students = input[1].split(" ").map(Number);

const diff = [];

for (let i = 0; i < N - 1; i++) {
    diff.push(students[i + 1] - students[i]);
}

diff.sort((a, b) => b - a);

let answer = 0;

for (let i = K - 1; i < N - 1; i++) {
    answer += diff[i];
}

console.log(answer);
