// 행성 연결

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...info] = require('fs').readFileSync(filePath).toString().trim().split('\n');
info = info.map(x=>x.split(' ').map(Number));
N = +N;

const parent = Array.from({length: N+1}, (_, idx)=>idx);
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
  let planet = [];
  for(let i=0; i<N-1; i++) {
    for(let j=i+1; j<N; j++) {
      planet.push([i+1, j+1, info[i][j]]);
    }
  }

  planet.sort((a, b) => a[2] - b[2]);

  for(let i=0; i<planet.length; i++) {
    [v1, v2, w] = planet[i];
    if(getParent(v1) === getParent(v2)) continue;
    unionParent(v1, v2);
    answer.push(w);
  }
  return answer.reduce((acc, cur) => acc+cur, 0);
}

console.log(solution());