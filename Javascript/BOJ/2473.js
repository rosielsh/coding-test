const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input[0];
const values = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
let minSub = Number.MAX_SAFE_INTEGER; // 0에 가장 가까운 특성값
const combi = Array.from({ length: 3 }, () => 0);

// 포인터 1
for (let fPtr = 0; fPtr <= N - 3; fPtr++) {
  let left = fPtr + 1; // 포인터 2
  let right = N - 1; // 포인터 3

  while (left < right) {
    const sum = values[fPtr] + values[left] + values[right];

    if (Math.abs(sum) < minSub) {
      minSub = Math.abs(sum);
      combi[0] = values[fPtr];
      combi[1] = values[left];
      combi[2] = values[right];
    }

    if (sum < 0) left++;
    else right--;
  }
}

console.log(combi.join(" "));
