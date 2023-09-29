const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

function solution() {
  let answer = 0;
  const word1 = input[0].replace("\r", "").split("");
  const word2 = input[1].replace("\r", "").split("");

  const dp = Array.from({ length: word1.length + 1 }, () => Array(word2.length + 1).fill(0));

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }

  let i = word1.length;
  let j = word2.length;

  const lcs = [];

  while (i > 0 && j > 0) {
    if (word1[i - 1] === word2[j - 1]) {
      lcs.push(word1[i - 1]);
      i--;
      j--;
    } else {
      // 왼쪽 dp값이 더 크면
      if (dp[i][j - 1] > dp[i - 1][j]) j--;
      else i--;
    }
  }

  answer = dp[word1.length][word2.length] + "\n";
  answer += lcs.reverse().join("");

  if (lcs.length === 0) answer = 0;

  return answer;
}

console.log(solution());
