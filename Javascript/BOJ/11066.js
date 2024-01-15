const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const T = input.shift();

const answer = []; // 테스트 케이스 마다 모든 장을 합치는 데 필요한 최소 비용 저장

for (let t = 0; t < T; t++) {
    const K = +input.shift(); // 소설의 장 수
    const files = input.shift().split(" ").map(Number); // 각 장의 페이지 수
    files.unshift(0);

    const dp = Array.from({ length: K + 1 }, () => Array(K + 1).fill(0));
    const sum = Array.from({ length: K + 1 }, () => 0);

    sum[1] = files[1];
    for (let i = 2; i <= K; i++) {
        sum[i] = sum[i - 1] + files[i];
    }

    for (let gap = 1; gap < K; gap++) {
        for (let left = 1; left + gap <= K; left++) {
            let right = left + gap;
            dp[left][right] = Number.MAX_SAFE_INTEGER;

            for (let mid = left; mid < right; mid++) {
                // sum[right] - sum[left - 1] : left-right사이의 파일을 합치는데 필요한 비용
                const result = dp[left][mid] + dp[mid + 1][right] + sum[right] - sum[left - 1];

                if (result < dp[left][right]) {
                    dp[left][right] = result;
                }
            }
        }
    }

    answer.push(dp[1][K]);
}

console.log(answer.join("\n"));
