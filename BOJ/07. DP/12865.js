// 평범한 배낭

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, K] = input.shift().split(" ").map(Number);
const item = input.map((x) => x.split(" ").map(Number));
const dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(0));

function solution() {
  for (let i = 1; i <= N; i++) {
    // 물건
    for (let j = 1; j <= K; j++) {
      // 무게
      if (item[i - 1][0] > j) {
        // 물건의 무게가 배낭의 용량보다 크면 => 넣을 수 없음
        dp[i][j] = dp[i - 1][j]; // 이전까지 넣었던 무게로 갱신
      } else if (item[i - 1][0] <= j) {
        // 물건의 무게가 배낭의 용량보다 작으면 => 넣을 수 있음
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - item[i - 1][0]] + item[i - 1][1]);
      }
    }
  }
  return dp[N][K];
}

console.log(solution());
