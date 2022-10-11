// 문제 : 아스키 코드
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution() {
    console.log(input[0].charCodeAt(0))
}

solution();