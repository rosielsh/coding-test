// 문제 : 별 찍기
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution() {
    for(let i=1; i<=+input; i++) {
        console.log('*'.repeat(i));
    }
}

solution();