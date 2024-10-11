const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, H] = input.shift().split(" ").map(Number);
const obstacle = input.map(Number);

const prefix = new Array(H + 1).fill(0);

for (let i = 0; i < N; i++) {
    if (i % 2 === 0) {
        prefix[0] += 1;
        prefix[obstacle[i]] -= 1;
    } else {
        prefix[H - obstacle[i]] += 1;
        prefix[H] -= 1;
    }
}

for (let i = 1; i <= H; i++) {
    prefix[i] += prefix[i - 1];
}

let min = Number.MAX_SAFE_INTEGER;
let cnt = 1;

for (let i = 0; i < H; i++) {
    if (prefix[i] < min) {
        min = prefix[i];
        cnt = 1;
    } else if (min === prefix[i]) {
        cnt++;
    }
}

console.log(`${min} ${cnt}`);
