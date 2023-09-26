// 수 묶기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let [N, ...nums] = require("fs").readFileSync(filePath).toString().trim().split("\n");
N = +N;

function solution() {
  let answer = 0;

  if (N === 1) return nums[0];

  const plus = [];
  const minus = [];

  nums.forEach((num) => {
    if (num > 0) plus.push(+num);
    else minus.push(+num);
  });

  plus.sort((a, b) => b - a);
  minus.sort((a, b) => a - b);

  if (plus.length === 1) answer += plus[0];
  else {
    if (plus.length % 2 === 1) answer += plus[plus.length - 1];

    for (let i = 0; i < plus.length - 1; i += 2) {
      if (plus[i] === 1 || plus[i + 1] === 1) {
        answer += plus[i] + plus[i + 1];
      } else answer += plus[i] * plus[i + 1];
    }
  }

  if (minus.length === 1) answer += minus[0];
  else {
    if (minus.length % 2 === 1) answer += minus[minus.length - 1];

    for (let i = 0; i < minus.length - 1; i += 2) {
      answer += minus[i] * minus[i + 1];
    }
  }

  return answer;
}

console.log(solution());
