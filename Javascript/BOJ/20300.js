const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const loss = input[1]
    .split(" ")
    .map(BigInt)
    .sort((a, b) => a > b ? 1 : -1);

let max = 0;
if (N % 2 === 1) {
    max = loss.pop();
}

for (let i = 0; i < Math.floor(N / 2); i++) {
    const sum = loss[i] + loss[loss.length - 1 - i];
    if (sum > max) {
        max = sum;
    }
}

console.log(max.toString());
