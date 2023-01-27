// 문제 : 상수
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [a, b] = require('fs').readFileSync(filePath).toString().split(' ');

function solution() {
    const revA = +a.split('').reverse().join('');
    const revB = +b.split('').reverse().join('');
    
    const result = revA > revB ? revA : revB;
    console.log(result);
}

solution();