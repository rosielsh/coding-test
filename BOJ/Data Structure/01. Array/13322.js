const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('').map(x=>+x);

console.log(Array.from({length: input.length}, (_, idx) => idx + 0).join('\n'));

// Array.from
// = 배열을 생성하는 함수