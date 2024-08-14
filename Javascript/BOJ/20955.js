const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const nuruns = input.map((x) => x.split(" ").map(Number));

const parents = Array.from({ length: N + 1 }, (_, idx) => idx);

const find = (x) => {
    if (x === parents[x]) return x;
    else return (parents[x] = find(parents[x]));
};

const union = (a, b) => {
    const pa = find(a);
    const pb = find(b);

    if (pa < pb) parents[pb] = pa;
    else parents[pa] = pb;
};

let cnt = 0;
for (let [u, v] of nuruns) {
    if (find(u) === find(v)) {
        cnt++;
        continue;
    }

    union(u, v);
}

for (let i = 1; i <= N; i++) {
    if (find(parents[i]) !== 1) {
        parents[i] = 1;
        cnt++;
    }
}

console.log(cnt);
