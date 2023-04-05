// RGB거리 2

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...house] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
house = house.map((x) => x.split(" ").map(Number));

function solution() {
  let answer = Number.MAX_SAFE_INTEGER;
  let dp = Array.from({ length: N }, () => Array(3).fill(Infinity));

  for (let i = 0; i < 3; i++) {
    dp = Array.from({ length: N }, () => Array(3).fill(Infinity));
    dp[0][i] = house[0][i];

    for (let j = 1; j < N; j++) {
      dp[j][0] = house[j][0] + Math.min(dp[j - 1][1], dp[j - 1][2]);
      dp[j][1] = house[j][1] + Math.min(dp[j - 1][0], dp[j - 1][2]);
      dp[j][2] = house[j][2] + Math.min(dp[j - 1][0], dp[j - 1][1]);
    }

    for (let k = 0; k < 3; k++) {
      if (i === k) continue;
      answer = Math.min(dp[N - 1][k], answer);
    }
  }
  return answer;
}

console.log(solution());
