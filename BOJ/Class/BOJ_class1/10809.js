const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('');
const arr = Array.from({length: 26}, ()=>-1);

function solution() {
  for(let i=0; i<input.length; i++) {
    if(arr[input[i].charCodeAt(0) - 97] !== -1) continue;
    arr[input[i].charCodeAt(0) - 97] = i;
  }
  return arr.join(' ');
}

console.log(solution());