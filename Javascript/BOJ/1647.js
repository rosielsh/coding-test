const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const edges = input
  .slice(1)
  .map((x) => x.split(" ").map(Number))
  .sort((a, b) => a[2] - b[2]);

const parent = Array.from({ length: N + 1 }, (_, idx) => idx);

const find = (x) => {
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x]));
};

const union = (a, b) => {
  const pa = find(a);
  const pb = find(b);

  if (pa < pb) parent[pb] = pa;
  else parent[pa] = pb;
};

let cnt = 0;
let answer = 0;

for (let [a, b, m] of edges) {
  if (find(a) === find(b)) continue;

  union(a, b);
  cnt++;

  if (cnt === N - 1) break;
  answer += m;
}

console.log(answer);
