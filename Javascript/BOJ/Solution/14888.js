// 연산자 끼워넣기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, operands, operators] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;
operands = operands.split(" ").map(Number);
operators = operators.split(" ").map(Number);

let maxValue = Number.MIN_SAFE_INTEGER;
let minValue = Number.MAX_SAFE_INTEGER;

function solution(value, idx) {
  if (idx === N) {
    minValue = Math.min(value, minValue);
    maxValue = Math.max(value, maxValue);
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (operators[i]) {
      operators[i] -= 1;
      if (i === 0) solution(value + operands[idx], idx + 1);
      else if (i === 1) solution(value - operands[idx], idx + 1);
      else if (i === 2) solution(value * operands[idx], idx + 1);
      else solution(parseInt(value / operands[idx]), idx + 1);
      operators[i] += 1;
    }
  }
}

solution(operands[0], 1);
console.log(`${maxValue}\n${minValue}`);
