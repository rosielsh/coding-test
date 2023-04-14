// 정수 삼각형

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const n = +input.shift();
const triangle = input.map((x) => x.split(" ").map(Number));
const dp = Array.from({ length: n }, (_, idx) => Array(idx + 1).fill(0));

function solution() {
  let answer;
  dp[0] = triangle.shift();

  for (let i = 1; i < n; i++) {
    // 층 별로 반복
    const floor = triangle.shift(); // 한 층씩 뽑아서
    for (let j = 0; j < floor.length; j++) {
      // 원소 하나씩 순회
      if (j === 0) dp[i][j] = dp[i - 1][0] + floor[j];
      else if (j === i) dp[i][j] = dp[i - 1][dp[i - 1].length - 1] + floor[j];
      else {
        dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + floor[j];
      }
    }
  }
  answer = Math.max(...dp[n - 1]);
  return answer;
}

console.log(solution());
