const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, W] = input.shift().split(" ").map(Number);
const edges = input.map((x) => x.split(" ").map(Number));

const edgeCnt = Array.from({ length: N + 1 }, () => 0);

for (let [a, b] of edges) {
    edgeCnt[a]++;
    edgeCnt[b]++;
}

let leafCnt = 0;
for (let i = 2; i <= N; i++) {
    if (edgeCnt[i] === 1) leafCnt++;
}

console.log(W / leafCnt);
