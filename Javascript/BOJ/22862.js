const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const S = input.shift().split(" ").map(Number);

let j = 0;
let hCnt = 0;
let answer = Number.MIN_SAFE_INTEGER;

for (let i = 0; i < N; i++) {
    while (j < N && hCnt <= K) {
        hCnt += S[j] % 2 === 1 ? 1 : 0;
        j++;
    }

    answer = Math.max(answer, j - i - 1 - (hCnt - 1));

    hCnt -= S[i] % 2 === 1 ? 1 : 0;
}

console.log(answer);
