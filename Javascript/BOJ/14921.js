const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];
const liquid = input[1].split(" ").map(Number);

let left = 0;
let right = N - 1;

let answer = Infinity;

while (left < right) {
    const sum = liquid[left] + liquid[right];

    if (sum === 0) {
        answer = 0;
        break;
    } else if (sum > 0) {
        right--;
    } else if (sum < 0) {
        left++;
    }

    answer = Math.abs(answer) > Math.abs(sum) ? sum : answer;
}

console.log(answer);
