const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift();
const limit = input
    .shift()
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);
const M = +input.shift();
const box = input
    .shift()
    .split(" ")
    .map(Number)
    .sort((a, b) => b - a);

let left = 0;
let right = 1000000;

const isPossible = (target) => {
    let boxPtr = 0;
    let total = 0;

    for (let i = 0; i < N; i++) {
        const lim = limit[i];
        let cnt = 0;
        while (boxPtr < M && cnt < target) {
            if (box[boxPtr] > lim) {
                boxPtr++;
            } else {
                cnt++;
                boxPtr++;

                if (cnt === target) {
                    break;
                }
            }
        }

        total += cnt;
    }

    if (total === M) return true;
    return false;
};

let mid;

while (left < right) {
    mid = parseInt((left + right) / 2);

    if (isPossible(mid)) {
        right = mid;
    } else {
        left = mid + 1;
    }
}

console.log(right === 1000000 ? -1 : right);
