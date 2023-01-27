// 문제 : 쿼드트리

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const media = input.map(x=>x.replace('\r','').split('').map(x=>+x));
const answer = [];

function recursion(y, x, n) {
  let sum = 0;
  for(let i=0; i<n; i++) {
    for(let j=0; j<n; j++) {
      sum += media[x+i][y+j];
    }
  }

  if(sum === 0) answer.push(0);
  else if(sum === n*n) answer.push(1);
  else {
    n /= 2;
    answer.push('(');
    recursion(y, x, n);
    recursion(y+n, x, n);
    recursion(y, x+n, n);
    recursion(y+n, x+n, n);
    answer.push(')');
  }
  return answer.join('');
}

function solution() {
  console.log(recursion(0, 0, N));
}

solution();