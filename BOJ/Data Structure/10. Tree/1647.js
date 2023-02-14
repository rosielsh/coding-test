// 도시 분할 계획

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number);
const info = input.map(x=>x.split(' ').map(Number)).sort((a,b) => a[2]-b[2]);
const parent = Array.from({length: N+1}, (_, idx) =>idx);

function getParent(v) {
  if(parent[v] === v) return v;
  return parent[v] = getParent(parent[v]);
}

function unionParent(v1, v2) {
  const p1 = getParent(v1);
  const p2 = getParent(v2);
  if(p1 < p2) parent[p2] = p1;
  else parent[p1] = p2;
}

function solution() {
  let answer = [];
  for(let i=0; i<M; i++) {
    [v1, v2, weight] = info[i];
    if(getParent(v1) === getParent(v2)) continue;
    unionParent(v1, v2);
    answer.push(weight);
  }

  return answer.sort((a,b)=>a-b).slice(0, -1).reduce((acc, cur) => acc+cur, 0);
}

console.log(solution());