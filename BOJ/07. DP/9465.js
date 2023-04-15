// 스티커

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[T, ...stickers] = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution() {
  let answer = [];
  for (let i = 0; i < T; i++) {
    let cnt = +stickers.shift();
    const sticker = stickers.splice(0, 2).map((x) => x.split(" ").map(Number));

    const dp = Array.from({ length: cnt + 1 }, () => Array(2).fill(0));

    dp[1][0] = sticker[0][0];
    dp[1][1] = sticker[1][0];

    for (let i = 2; i <= cnt; i++) {
      dp[i][0] = Math.max(dp[i - 1][1], dp[i - 2][1]) + sticker[0][i - 1];
      dp[i][1] = Math.max(dp[i - 1][0], dp[i - 2][0]) + sticker[1][i - 1];
    }

    answer.push(Math.max(...dp.at(-1)));
  }

  return answer.join("\n");
}

console.log(solution());
