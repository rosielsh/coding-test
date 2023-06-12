// 주사위

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [n, dice] = require("fs").readFileSync(filePath).toString().trim().split("\n");
n = +n;
dice = dice.split(" ").map(Number);

function solution() {
  let answer = 0;

  if (n === 1) return dice.reduce((acc, cur) => acc + cur, 0) - Math.max(...dice);

  const sum = Array.from({ length: 3 }, () => Infinity);

  for (let i = 0; i < 6; i++) {
    sum[0] = Math.min(sum[0], dice[i]);
    for (let j = i + 1; j < 6; j++) {
      if (i + j === 5) continue; // 마주보는 조합
      sum[1] = Math.min(sum[1], dice[i] + dice[j]);
      for (let k = j + 1; k < 6; k++) {
        if (j + k === 5 || k + i === 5) continue;
        sum[2] = Math.min(sum[2], dice[i] + dice[j] + dice[k]);
      }
    }
  }

  answer += sum[2] * 4;
  answer += sum[1] * ((n - 2) * 8 + 4);
  answer += sum[0] * ((n * n - (n - 2) * 4 - 4) * 5 + (n - 2) * 4);
  return answer;
}

console.log(solution());
