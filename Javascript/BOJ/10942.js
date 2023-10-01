const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution() {
  let answer = [];
  const N = +input.shift();
  const numbers = input.shift().split(" ").map(Number);
  const dp = Array.from({ length: N }, () => Array(N).fill(false));
  const M = +input.shift();
  const questions = input.map((x) => x.split(" ").map(Number));

  // 각 자리마다 팰린드롬 체크
  for (let i = 0; i <= N - 1; i++) {
    dp[i][i] = true;
  }

  for (let i = 0; i <= N - 2; i++) {
    if (numbers[i] === numbers[i + 1]) {
      dp[i][i + 1] = true;
    }
  }

  // 몇 스텝
  for (let s = 2; s <= N - 1; s++) {
    // 시작 지점
    for (let i = 0; i <= N - s - 1; i++) {
      // 끝 지점
      let j = i + s;

      // 만약 현재 시작지점, 끝지점의 수가 같고, 안쪽 수가 팰린드롬이었다면
      if (numbers[i] === numbers[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
      }
    }
  }

  for (let i = 0; i < M; i++) {
    const s = questions[i][0] - 1;
    const e = questions[i][1] - 1;
    answer.push(dp[s][e] ? 1 : 0);
  }

  return answer.join("\n");
}

console.log(solution());
