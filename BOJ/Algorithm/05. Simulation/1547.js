const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const M = +input.shift();
const change = input.map(x=>x.split(' ').map(x=>+x));

function solution() {
  let std = 1;

  change.map(x=>{
    if(x[0] === std) {
        std = x[1];
    } else if(x[1] === std) {
        std = x[0];
    }
  })
  return std;
}

console.log(solution());