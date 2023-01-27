const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, X] = input.shift().split(' ').map(x=>+x);
const arr = input[0].split(' ').map(x=>+x);

console.log(arr.filter(x=>x<X).join(' '));