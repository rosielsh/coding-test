const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const jewel = input.map(Number);

const possible = (value) => {
    let cnt = 0;
    for (let i = 0; i < M; i++) {
        cnt += Math.floor(jewel[i] / value);

        if (jewel[i] % value !== 0) cnt++;
    }

    if (cnt <= N) return true;
    return false;
};

let left = 1;
let right = Math.max(...jewel);

while (left < right) {
    const mid = parseInt((left + right) / 2);

    if (possible(mid)) {
        right = mid;
    } else {
        left = mid + 1;
    }
}

console.log(right);
