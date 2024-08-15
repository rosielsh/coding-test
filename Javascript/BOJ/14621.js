const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const gender = input.shift().split(" ");
const edge = input.map((x) => x.split(" ").map(Number)).sort((a, b) => a[2] - b[2]);

const parent = Array.from({ length: N + 1 }, (_, idx) => idx);

const find = (x) => {
    if (x === parent[x]) return x;
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
for (let [u, v, d] of edge) {
    if (gender[u - 1] === gender[v - 1]) continue;
    if (find(u) === find(v)) continue;

    union(u, v);
    answer += d;
    cnt++;

    if (cnt === N - 1) break;
}

console.log(cnt !== N - 1 ? -1 : answer);
