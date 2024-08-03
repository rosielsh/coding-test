const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const arr = input[0].split(" ").map(Number);

const sum = Array.from({ length: n + 1 }, () => 0);
const div = Array.from({ length: n + 1 }, () => 0);

for (let i = 1; i <= n; i++) {
    sum[i] = sum[i - 1] + arr[i - 1];
    div[i] = sum[i] % m;
}

const map = new Map();

for (let i = 0; i <= n; i++) {
    map.set(div[i], (map.get(div[i]) || 0) + 1);
}

let answer = 0;
for (let [key, value] of map) {
    answer += (value * (value - 1)) / 2;
}

console.log(answer);
