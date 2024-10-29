const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const A = input[1].split(" ").map(Number);

const dp = Array.from({ length: N }, () => Infinity);

dp[0] = 0;

for (let i = 1; i < N; i++) {
    for (let j = 0; j <= i - 1; j++) {
        const power = (i - j) * (1 + Math.abs(A[j] - A[i]));
        // i까지 오는 최대 힘이랑 i~j사이의 힘 간에 최대 힘을 구하고
        // 그 최대힘을 현재 저장된 dp값 중에서 최소값을 찾아야 함
        dp[i] = Math.min(dp[i], Math.max(dp[j], power));
    }
}

console.log(dp[N - 1]);

// 경로: 0 -> 2 -> 4 라고 할 때
// const power1 = (2-0)*(1+|A[0]-A[2]|);  // 0->2 점프
// const power2 = (4-2)*(1+|A[2]-A[4]|);  // 2->4 점프

// 전체 필요한 힘 = Math.max(power1, power2)
// 왜냐하면 가장 큰 힘이 필요한 점프가 전체 경로의 필요한 힘이 되기 때문
