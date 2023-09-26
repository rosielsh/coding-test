// 회전 초밥 - 실패

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, d, k, c] = input.shift().split(" ").map(Number);
const sushi = input.map(Number);
sushi.push(...sushi.slice(0, k - 1));

function solution() {
  let answer = Number.MIN_SAFE_INTEGER;
  for (let i = k; i > 1; i--) {
    let left = 0;
    let right = i - 1;
    let part;
    let partSet;
    while (right !== N + k - 1) {
      part = sushi.slice(left, right + 1);
      partSet = new Set(part);
      if (part.length === partSet.size) {
        // 중복된 것 없음
        answer = Math.max(answer, part.length);
        if (!part.includes(c)) answer++;
      }
      left++;
      right++;
    }
    if (answer !== Number.MIN_SAFE_INTEGER) break;
  }

  return answer;
}

console.log(solution());
