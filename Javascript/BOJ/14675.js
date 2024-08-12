const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const edge = input.splice(0, N - 1).map((x) => x.split(" ").map(Number));
const q = +input.shift();
const query = input.map((x) => x.split(" ").map(Number));

const cnt = Array.from({ length: N + 1 }, () => 0);

for (let [a, b] of edge) {
    cnt[a]++;
    cnt[b]++;
}

let answer = [];

for (let [t, k] of query) {
    if (t === 1) {
        answer.push(cnt[k] > 1 ? "yes" : "no");
    } else if (t === 2) {
        answer.push("yes");
    }
}

console.log(answer.join("\n"));
