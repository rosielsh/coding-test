// 플로이드

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[n, m, ...info] = require('fs').readFileSync(filePath).toString().trim().split('\n');
n = +n;
m = +m;

const bus = Array.from({length: n}, ()=>Array(n).fill(Infinity));
for(let i=0; i<m; i++) {
    [from, to, weight] = info[i].split(' ').map(Number);
    bus[from-1][to-1] = Math.min(weight, bus[from-1][to-1]);
}

for(let i=0; i<n; i++) {
    bus[i][i] = 0;
}

function solution() {
  for(let k=0; k<n; k++) {
    for(let i=0; i<n; i++) {
        for(let j=0; j<n; j++) {
            if(i === j) continue;
            if(bus[i][k] + bus[k][j] < bus[i][j]) bus[i][j] = bus[i][k]+bus[k][j];
        }
      }
  }
  
  return bus.map(x=>x.map(y=>y===Infinity? 0:y).join(' ')).join('\n');
}

console.log(solution());