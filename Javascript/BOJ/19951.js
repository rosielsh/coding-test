const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const height = input.shift().split(" ").map(Number);

const order = input.map((x) => x.split(" ").map(Number));

const prefix = Array.from({ length: N + 1 }, () => 0);

for (let [x, y, v] of order) {
    prefix[x - 1] += v;
    prefix[y] += -1 * v;
}

for (let i = 1; i <= N; i++) {
    prefix[i] += prefix[i - 1];
}

for (let i = 0; i < N; i++) {
    height[i] += prefix[i];
}

console.log(height.join(" "));
