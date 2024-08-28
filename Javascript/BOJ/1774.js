const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const pos = input.splice(0, N).map((x) => x.split(" ").map(Number));
const connected = input.map((x) => x.split(" ").map(Number));

const edges = [];

for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
        const dist = Math.sqrt((pos[j][1] - pos[i][1]) ** 2 + (pos[j][0] - pos[i][0]) ** 2);
        edges.push([i + 1, j + 1, dist]);
    }
}

edges.sort((a, b) => a[2] - b[2]);

const parent = Array.from({ length: N + 1 }, (_, idx) => idx);

const find = (x) => {
    if (parent[x] === x) return x;
    else return (parent[x] = find(parent[x]));
};

const union = (a, b) => {
    const pa = find(a);
    const pb = find(b);

    if (pa < pb) parent[pb] = pa;
    else parent[pa] = pb;
};

for (let [a, b] of connected) {
    union(a, b);
}

let needConnectCnt = 0;
for (let i = 1; i <= N; i++) {
    if (parent[i] !== 1) needConnectCnt++;
}

let answer = 0;
for (let [a, b, d] of edges) {
    if (find(a) === find(b)) continue;

    union(a, b);
    answer += d;

    needConnectCnt--;

    if (needConnectCnt === 0) break;
}

console.log(answer.toFixed(2));
