const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const snow = input
    .shift()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

let answer = Number.MAX_SAFE_INTEGER;

for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
        let left = 0;
        let right = N - 1;

        const sum = snow[i] + snow[j];
        let minSub = Number.MAX_SAFE_INTEGER;

        while (left < right) {
            while (left === i || left === j) left++;
            while (right === i || right === j) right--;

            if (left >= right) break;

            const res = snow[left] + snow[right] - sum;
            minSub = Math.min(minSub, Math.abs(res));

            if (res === 0) {
                break;
            } else if (res > 0) {
                right--;
            } else if (res < 0) {
                left++;
            }
        }

        answer = Math.min(answer, minSub);
    }
}

console.log(answer);
