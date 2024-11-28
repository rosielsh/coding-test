const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const M = +input.shift();
const connect = input.slice(0, N).map((x) => x.split(" ").map(Number));

const plan = input[N].split(" ").map(Number);

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

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (connect[i][j]) {
      union(i + 1, j + 1);
    }
  }
}

let answer = true;

for (let i = 0; i < M - 1; i++) {
  const a = plan[i];
  const b = plan[i + 1];

  if (find(a) !== find(b)) {
    answer = false;
    break;
  }
}

console.log(answer ? "YES" : "NO");
