const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const arr = input.shift().split(" ").map(Number);

let answer = 0;

let left = 0;
let right = N - 1;

while (left < right) {
    const res = (right - left - 1) * Math.min(arr[left], arr[right]); // 팀 능력치
    answer = Math.max(answer, res);

    if (arr[left] < arr[right]) left++;
    else right--;
}

console.log(answer);
