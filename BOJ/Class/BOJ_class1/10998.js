const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split(' ').map(x=>+x);

console.log(input[0]*input[1]);