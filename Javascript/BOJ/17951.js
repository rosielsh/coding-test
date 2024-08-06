const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const correct = input.shift().split(" ").map(Number);

let left = 0;
let right = N * 20;

let maxVal = -1;

while (left <= right) {
    const mid = parseInt((left + right) / 2);

    let gCnt = 0;
    let sum = 0;
    for (let i = 0; i < N; i++) {
        sum += correct[i];

        if (sum >= mid) {
            sum = 0;
            gCnt++;

            if (gCnt === K) break;
        }
    }

    if (gCnt >= K) {
        left = mid + 1;
        maxVal = Math.max(maxVal, mid);
    } else {
        right = mid - 1;
    }
}

console.log(maxVal);
