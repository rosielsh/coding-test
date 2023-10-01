const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const parents = Array.from({ length: N }, () => 0);

for (let i = 0; i < N; i++) {
  parents[i] = i;
}

// 현재 부모를 구하는 함수
function getParent(x) {
  if (parents[x] === x) return x;
  return (parents[x] = getParent(parents[x]));
}

function union(a, b) {
  const pa = getParent(a);
  const pb = getParent(b);

  if (pa < pb) {
    parents[pb] = pa;
  } else parents[pa] = pb;
}

let isCycle = false;

for (let i = 0; i < M; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  if (getParent(a) === getParent(b)) {
    console.log(i + 1);
    isCycle = true;
    break;
  } else {
    union(a, b);
  }
}

if (!isCycle) console.log(0);
