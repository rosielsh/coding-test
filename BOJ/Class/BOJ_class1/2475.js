// 문제 : 검증수
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const number = input[0].split(' ').map(ele=>+ele);

function solution() {
    let result = 0;
    number.map((ele) => {
        result += ele*ele % 10;
    })
    console.log(result % 10);
}

solution();