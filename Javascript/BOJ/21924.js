const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const road = input.map((x) => x.split(" ").map(Number)).sort((a, b) => a[2] - b[2]);
const totalSum = road.reduce((acc, cur) => {
    return acc + cur[2];
}, 0);

const parent = Array.from({ length: N + 1 }, (_, idx) => idx); // 모든 도로의 집합 번호

let connectCnt = 0;
let sum = 0;

const getParent = (x) => {
    if (parent[x] === x) return x;
    return (parent[x] = getParent(parent[x]));
};

const union = (a, b) => {
    const pa = getParent(a);
    const pb = getParent(b);

    if (pa === pb) return true;

    if (pa < pb) parent[pb] = pa;
    else parent[pa] = pb;

    return false;
};

for (let i = 0; i < M; i++) {
    const [a, b, c] = road[i];

    const isCycle = union(a, b);

    if (isCycle) continue;
    else {
        connectCnt++;
        sum += c;
    }

    if (connectCnt === N - 1) break;
}

for (let i = 1; i <= N; i++) {
    parent[i] = getParent(i);
}

const std = parent[1];

for (let i = 2; i <= N; i++) {
    if (std !== parent[i]) {
        console.log(-1);
        return;
    }
}

console.log(totalSum - sum);
