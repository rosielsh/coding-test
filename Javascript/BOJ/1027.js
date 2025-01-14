const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const height = input[1].split(" ").map(Number);

let answer = 0;

for (let i = 0; i < N; i++) {
  const curHeight = height[i];
  let seeCnt = 0;

  for (let left = 0; left <= i - 1; left++) {
    let a = (curHeight - height[left]) / (i - left);
    let b = curHeight - a * i;

    let flag = true;

    for (let mid = left + 1; mid <= i - 1; mid++) {
      if (a * mid + b <= height[mid]) {
        flag = false;
        break;
      }
    }

    if (flag) seeCnt++;
  }

  for (let right = i + 1; right < N; right++) {
    let a = (height[right] - curHeight) / (right - i);
    let b = curHeight - a * i;

    let flag = true;

    for (let mid = i + 1; mid <= right - 1; mid++) {
      if (a * mid + b <= height[mid]) {
        flag = false;
        break;
      }
    }

    if (flag) seeCnt++;
  }

  answer = Math.max(answer, seeCnt);
}

console.log(answer);
