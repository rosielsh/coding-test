const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const p = input.map(x=>x.split(' ').map(y=>+y));

function solution() {
  let answer = p[1].concat(p[2]);
  return answer.sort((a,b) => a-b).join(' ');
}

console.log(solution());