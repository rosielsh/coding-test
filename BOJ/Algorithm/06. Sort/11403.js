// 경로 찾기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const n = +input.shift();
const matrix = input.map(x=>x.split(' ').map(Number));

function solution() {
  for(let k=0; k<n; k++) {
    for(let i=0; i<n; i++) {
      for(let j=0; j<n; j++) {
        if(matrix[i][k] && matrix[k][j]) matrix[i][j] = 1;
      }
    }
  }
  return matrix.map(x=>x.join(' ')).join('\n');
}

console.log(solution());