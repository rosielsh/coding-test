const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const honey = input.shift().split(" ").map(Number);
honey.unshift(0);

const prefixSum = Array.from({ length: N + 1 }, () => 0);

for (let i = 1; i <= N; i++) {
    prefixSum[i] = honey[i] + prefixSum[i - 1];
}

let answer = 0;

for (let i = 2; i < N; i++) {
    const f = prefixSum[i] - prefixSum[1];
    const b = prefixSum[N - 1] - prefixSum[i - 1];
    answer = Math.max(answer, f + b);
}

for (let i = 2; i < N; i++) {
    const f = prefixSum[N - 1] - honey[i];
    const s = prefixSum[i - 1];

    answer = Math.max(answer, f + s);
}

for (let i = 2; i < N; i++) {
    const f = prefixSum[N] - honey[i] - honey[1];
    const s = prefixSum[N] - prefixSum[i];

    answer = Math.max(answer, f + s);
}

console.log(answer);
