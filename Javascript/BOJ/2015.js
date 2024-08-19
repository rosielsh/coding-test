const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const arr = input.shift().split(" ").map(Number);

const prefix = Array.from({ length: N + 1 }, () => 0);

let answer = 0;
const map = new Map();

for (let i = 1; i <= N; i++) {
    prefix[i] = prefix[i - 1] + arr[i - 1];
    if (prefix[i] === K) answer++;
}

for (let i = 1; i <= N; i++) {
    answer += map.get(prefix[i] - K) || 0;
    map.set(prefix[i], (map.get(prefix[i]) || 0) + 1);
}

console.log(answer);
