// 동전 0

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
[N, K] = input.shift().split(" ").map(Number);
const coin = input.map(Number).reverse();

function solution() {
  let answer = 0;
  for (let i = 0; i < N; i++) {
    if (K >= coin[i]) {
      answer += parseInt(K / coin[i]);
      K %= coin[i];
    }
  }

  return answer;
}

console.log(solution());
