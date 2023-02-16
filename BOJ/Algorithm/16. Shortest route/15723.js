// n단 논법 -> 런타임 에러

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
n = +input[0];
premise = input.slice(1, n+1).map(x=>x.replace('\r', '').split(' is '));
m = +input[n+1];
conclusion = input.slice(n+2).map(x=>x.replace('\r','').split(' is '));

const set = new Set();
for(let i=0; i<n; i++) {
    for(let j=0; j<2; j++) {
        if(!set.has(premise[i][j].charCodeAt(0)-97)) {
            set.add(premise[i][j].charCodeAt(0)-97);
        }
    }
}

const len = set.size;
const matrix = Array.from({length: len}, ()=>Array(len).fill(0));
for(let i=0; i<n; i++) {
    n1 = premise[i][0].charCodeAt(0)-97;
    n2 = premise[i][1].charCodeAt(0)-97;
    matrix[n1][n2] = 1;
}

function solution() {
  let answer = [];
  for(let k=0; k<len; k++) {
    for(let i=0; i<len; i++) {
        for(let j=0; j<len; j++) {
            if(i === j) continue;
            if(matrix[i][j]) continue;

            if(matrix[i][k] && matrix[k][j]) matrix[i][j] = 1;
        }
    }
  }
  
  for(let i=0; i<m; i++) {
    n1 = conclusion[i][0].charCodeAt(0) - 97;
    n2 = conclusion[i][1].charCodeAt(0) - 97;
    answer.push(matrix[n1][n2] ? 'T':'F');
  }
  return answer.join('\n');
}

console.log(solution());