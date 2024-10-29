const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [K, N] = input.shift().split(" ").map(Number);
const lan = input.map(Number);

let left = 1;
let right = Math.max(...lan);
let maxLen = -1;

const possible = (len) => {
    let cnt = 0;
    for (let i = 0; i < K; i++) {
        cnt += parseInt(lan[i] / len);
    }

    return cnt >= N;
};

while (left <= right) {
    const mid = parseInt((left + right) / 2);

    if (possible(mid)) {
        left = mid + 1;
        maxLen = Math.max(maxLen, mid);
    } else right = mid - 1;
}

console.log(maxLen);
