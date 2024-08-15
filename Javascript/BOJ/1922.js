const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const M = +input.shift();

const edge = input.map((x) => x.split(" ").map(Number)).sort((a, b) => a[2] - b[2]);

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

let cnt = 0;
let answer = 0;

for (let [a, b, c] of edge) {
    const pa = find(a);
    const pb = find(b);

    if (pa === pb) continue;

    union(a, b);

    cnt++;
    answer += c;

    if (cnt === N - 1) break;
}

console.log(answer);
