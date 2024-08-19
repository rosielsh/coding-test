const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((x) => x.split(" ").map(Number));

const prefix = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
        prefix[i][j] =
            prefix[i - 1][j] + prefix[i][j - 1] - prefix[i - 1][j - 1] + arr[i - 1][j - 1];
    }
}

let answer = Number.MIN_SAFE_INTEGER;

for (let a = 1; a <= N; a++) {
    for (let b = 1; b <= M; b++) {
        for (let c = a; c <= N; c++) {
            for (let d = b; d <= M; d++) {
                answer = Math.max(
                    answer,
                    prefix[c][d] - prefix[c][b - 1] - prefix[a - 1][d] + prefix[a - 1][b - 1]
                );
            }
        }
    }
}

console.log(answer);
