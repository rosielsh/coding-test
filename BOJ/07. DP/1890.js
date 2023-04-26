// 점프

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N, ...board] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;

const dp = Array.from({ length: N }, () => Array(N).fill(BigInt(0)));
dp[0][0] = BigInt(1);

// 현재 자리까지 올 수 있는 경로의 갯수를 구하는 함수
function calcRoute(r, c) {
  // 행 검사
  const nextRow = r + board[r][c];
  const nextCol = c + board[r][c];
  if (nextRow < N) dp[nextRow][c] += dp[r][c];
  if (nextCol < N) dp[r][nextCol] += dp[r][c];
}

function solution() {
  let answer = 0;
  board = board.map((row) => row.split(" ").map(Number));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!board[i][j]) continue;
      calcRoute(i, j);
    }
  }

  answer = dp[N - 1][N - 1].toString();
  return answer;
}

console.log(solution());
