// 문제 : 구구단
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution() {
    const n = +input;
    for(let i=1; i<=9; i++) {
        console.log(`${n} * ${i} = ${n*i}`);
    }
}

solution();