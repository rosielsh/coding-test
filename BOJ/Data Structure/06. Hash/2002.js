// 추월

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const before = new Map();
input.splice(0, N).forEach((x, idx) => {
  before.set(x, idx);
})

let answer = 0;
outerFor: for(let i=0; i<N-1; i++) {
  innerFor: for(let j=i+1; j<N; j++) {
    let std = before.get(input[i]); 
    let cmp = before.get(input[j]);
    if(std > cmp) { 
      answer += 1;
      break innerFor;
    }
  }
}

console.log(answer);