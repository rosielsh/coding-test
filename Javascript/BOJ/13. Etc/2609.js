// 최대공약수와 최소공배수

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [a, b] = require("fs").readFileSync(filePath).toString().trim().split(" ").map(Number);

function solution() {
  let answer;
  let multiple = Number.MIN_SAFE_INTEGER; // 최소공배수
  let divisor = Number.MAX_SAFE_INTEGER; // 최대공약수
  let dflag = a > b ? b : a;
  let mflag = a > b ? a : b;

  for (let i = 1; i <= dflag; i++) {
    if (a % i === 0 && b % i === 0) divisor = i;
  }

  for (let i = 1; ; i++) {
    if ((mflag * i) % a === 0 && (mflag * i) % b === 0) {
      multiple = mflag * i;
      break;
    }
  }
  answer = divisor + "\n" + multiple;
  return answer;
}

console.log(solution());
