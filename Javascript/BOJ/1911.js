const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, L] = input.shift().split(" ").map(Number);
const pos = input.map((x) => x.split(" ").map(Number)).sort((a, b) => a[0] - b[0]);

let cnt = 0;
let prev = -1;

for (let [x, y] of pos) {
    if (prev > y) continue;

    if (x < prev) {
        x = prev;
    }

    const len = y - x;
    const left = len % L;

    if (!left) {
        cnt += len / L;
    } else {
        cnt += parseInt(len / L) + 1;
        prev = x + (parseInt(len / L) + 1) * L;
    }
}

console.log(cnt);
