const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const info = input.map((x) => x.split(" ").map(Number));

const pos = [];

let idx = 0;
for (let [x, r] of info) {
    pos.push([x - r, 1, idx]);
    pos.push([x + r, 0, idx]);
    idx++;
}

pos.sort((a, b) => a[0] - b[0]);

let flag = true;
for (let i = 1; i < N; i++) {
    if (pos[i - 1][0] === pos[i][0]) {
        flag = false;
        break;
    }
}

if (flag) {
    const stack = [];
    for (let [p, isOpen, idx] of pos) {
        if (isOpen) {
            stack.push(idx);
        } else {
            if (stack[stack.length - 1] !== idx) {
                flag = false;
                break;
            } else stack.pop();
        }
    }
}

console.log(flag ? "YES" : "NO");
