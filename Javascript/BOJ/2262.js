const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const n = +input[0];
let lank = input[1].split(" ").map(Number);

let answer = 0;

for (let i = 0; i < n - 1; i++) {
    const maxIdx = lank.indexOf(Math.max(...lank));

    let minSub = Number.MAX_SAFE_INTEGER;
    if (maxIdx - 1 >= 0) {
        minSub = Math.min(minSub, Math.abs(lank[maxIdx] - lank[maxIdx - 1]));
    }

    if (maxIdx + 1 < lank.length) {
        minSub = Math.min(minSub, Math.abs(lank[maxIdx + 1] - lank[maxIdx]));
    }

    answer += minSub;
    lank.splice(maxIdx, 1);
}

console.log(answer);
