const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [V, E] = input[0].split(" ").map(Number);
const info = input
  .slice(1)
  .map((x) => x.split(" ").map(Number))
  .sort((a, b) => a[2] - b[2]);

const parent = Array.from({ length: V + 1 }, (_, idx) => idx);

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

for (let [from, to, weight] of info) {
  const pf = find(from);
  const pt = find(to);

  if (pf === pt) continue;

  union(pf, pt);
  cnt++;
  answer += weight;

  if (cnt === V - 1) break;
}

console.log(answer);
