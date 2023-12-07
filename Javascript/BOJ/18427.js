const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

const [N, M, H] = input.shift().split(" ").map(Number);
const block = input.map((x) => x.split(" ").map(Number));
const dp = Array.from({ length: N + 1 }, () => Array(H + 1).fill(0));

dp[0][0] = 1;

// 전체 학생 순회
for (let i = 1; i <= N; i++) {
  dp[i][0] = 1;
  // 전체 무게 순회
  for (let j = 1; j <= H; j++) {
    const blockCnt = block[i - 1].length;
    for (let k = 0; k < blockCnt; k++) {
      // 만약 현재 선택하려는 블록이 만들려고 하는 무게보다 크면 pass
      if (block[i - 1][k] > j) continue;

      dp[i][j] = (dp[i][j] + dp[i - 1][j - block[i - 1][k]]) % 10007;
    }

    dp[i][j] = (dp[i][j] + dp[i - 1][j]) % 10007;
  }
}

console.log(dp[N][H]);
