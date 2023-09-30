const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

let N;
let numbers;
let isExist = Array.from({ length: 1000001 }, () => false);
let score = Array.from({ length: 1000001 }, () => 0);

function solution() {
  let answer = [];
  N = +input[0];
  numbers = input[1].split(" ").map(Number);

  for (let i = 0; i < N; i++) {
    isExist[numbers[i]] = true;
  }

  // 전체 카드 순회하면서
  for (let i = 0; i < N; i++) {
    const num = numbers[i];
    // 배수들만 확인
    for (let j = num * 2; j <= 1000000; j += num) {
      // 만약에 배수가 존재하면 i가 승리, j는 패배
      if (isExist[j]) {
        score[num]++;
        score[j]--;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    answer.push(score[numbers[i]]);
  }

  return answer.join(" ");
}

console.log(solution());
