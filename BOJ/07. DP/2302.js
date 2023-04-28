// 극장 좌석

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N, M, ...vip] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
M = +M;
vip = vip.map(Number);

function solution() {
  let answer = 1;
  const dp = Array.from({ length: N + 1 }, () => 0);

  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  // 이전 vip좌석을 가리키는 포인터
  let cur = 0;
  for (let i = 0; i < M; i++) {
    const next = vip[i];
    answer *= dp[next - cur - 1];
    cur = next;
  }

  answer *= dp[N - cur];

  return answer;
}

console.log(solution());
