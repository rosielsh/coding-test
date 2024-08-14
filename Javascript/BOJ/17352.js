const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const edges = input.map((x) => x.split(" ").map(Number));

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

for (let [a, b] of edges) {
    union(a, b);
}

let answer = 0;

for (let i = 1; i <= N; i++) {
    if (find(i) !== 1) {
        answer = find(i);
        break;
    }
}

console.log(`1 ${answer}`);
