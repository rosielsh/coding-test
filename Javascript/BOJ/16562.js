const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M, k] = input.shift().split(" ").map(Number);
const friendsMoney = input.shift().split(" ").map(Number);
const relation = input.map((x) => x.split(" ").map(Number));

const parent = Array.from({ length: N + 1 }, (_, idx) => idx);

const getParent = (x) => {
    if (parent[x] === x) return x;
    return (parent[x] = getParent(parent[x]));
};

const union = (a, b) => {
    const pa = getParent(a);
    const pb = getParent(b);

    if (pa === pb) return;

    if (pa < pb) parent[pb] = pa;
    else parent[pa] = pb;
};

for (let [v, w] of relation) {
    union(v, w);
}

const minCost = Array.from({ length: N + 1 }, () => Number.MAX_SAFE_INTEGER);
let money = 0;

for (let i = 1; i <= N; i++) {
    const num = getParent(i);
    minCost[num] = Math.min(minCost[num], friendsMoney[i - 1]);
}

for (let i = 1; i <= N; i++) {
    if (minCost[i] === Number.MAX_SAFE_INTEGER) continue;
    money += minCost[i];
}

console.log(money > k ? "Oh no" : money);
