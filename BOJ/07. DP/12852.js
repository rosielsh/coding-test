// 1로 만들기 2

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
N = +require("fs").readFileSync(filePath).toString().trim();
const dp = Array.from({ length: N + 1 }, () => Array(2).fill(0));

function solution() {
  dp[1] = [0, 0];
  for (let i = 2; i <= N; i++) {
    dp[i][0] = dp[i - 1][0] + 1;
    dp[i][1] = i - 1;

    if (i % 3 === 0) {
      if (dp[i][0] > dp[i / 3][0] + 1) {
        dp[i] = [dp[i / 3][0] + 1, i / 3];
      }
    }

    if (i % 2 === 0) {
      if (dp[i][0] > dp[i / 2][0] + 1) {
        dp[i] = [dp[i / 2][0] + 1, i / 2];
      }
    }
  }

  let route = [N];
  let idx = N;
  while (1) {
    if (idx === 1 || N === 1) break;
    route.push(dp[idx][1]);
    idx = dp[idx][1];
  }
  console.log(dp[N][0]);
  console.log(route.join(" "));
}

solution();
