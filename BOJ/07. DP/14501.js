const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...input] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
input = input.map((x) => x.split(" ").map(Number));
const dp = Array.from({ length: N + 1 }, () => 0);

function solution() {
  let answer;

  // 갱신하고자 하는 날짜
  for (let i = 0; i < N; i++) {
    // 그날 상담에 걸리는 날짜, 돈
    const [day, money] = input[i];
    // 현재날 i에서 상담일 day를 더한 범위가 전체 일수를 넘지 않으면
    if (i + day <= N) {
      // 이미 그날에 저장되어있는 수와 현재 최대값과 money를 더한 값 중 큰 수를 저장
      dp[i + day] = Math.max(dp[i + day], dp[i] + money);
    }
    // 금액이 유지되어야 하기 때문에 다음 날에 상담이 없는 경우 상담 금액이 이어져야 한다
    dp[i + 1] = Math.max(dp[i + 1], dp[i]);
  }

  answer = dp[N];
  return answer;
}

console.log(solution());
