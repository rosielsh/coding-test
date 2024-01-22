const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const matrix = input.map((x) => x.split(" ").map(Number));

const row = Array.from({ length: N }, () => 0);
const col = Array.from({ length: N }, () => 0);

for (let i = 0; i < N; i++) {
    row[i] = matrix[i][0];
    col[i] = matrix[i][1];
}

const dp = Array.from({ length: N }, () => Array(N).fill(0));

for (let i = 0; i < N - 1; i++) {
    dp[i][i + 1] = row[i] * row[i + 1] * col[i + 1];
}

for (let gap = 2; gap < N; gap++) {
    for (let left = 0; left < N - gap; left++) {
        let right = left + gap;
        for (let mid = left; mid < right; mid++) {
            let res = dp[left][mid] + dp[mid + 1][right] + row[left] * col[mid] * col[right];
            if (dp[left][right] === 0 || dp[left][right] > res) {
                dp[left][right] = res;
            }
        }
    }
}

console.log(dp[0][N - 1]);
