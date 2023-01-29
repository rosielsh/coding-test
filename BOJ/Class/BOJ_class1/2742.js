const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim();

let answer = '';
for(let i=input; i>=1; i--) {
  answer += i+'\n';
}

console.log(answer);