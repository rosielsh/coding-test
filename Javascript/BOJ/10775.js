const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const G = +input.shift();
const P = +input.shift();
const planeGate = input.map(Number);

const parent = Array.from({ length: G + 1 }, (_, idx) => idx); // 현재 게이트에 도킹할 때 가능한 게이트의 끝 번호

const getParent = (x) => {
    if (parent[x] === x) return x;
    return (parent[x] = getParent(parent[x]));
};

const union = (a, b) => {
    const pa = getParent(a);
    const pb = getParent(b);

    if (pa < pb) parent[pb] = pa;
    else parent[pa] = pb;
};

let answer = 0;

for (let i = 0; i < P; i++) {
    const gate = planeGate[i];
    const candi = getParent(gate);

    // 만약에 다음에 둘 곳이 0번 게이트면 종료
    if (candi === 0) break;

    answer++;
    union(candi, candi - 1);
}

console.log(answer);
