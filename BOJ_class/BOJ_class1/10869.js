// 문제 : 사칙연산
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [A, B] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(x=>+x);

function solution() {
    console.log(A+B);
    console.log(A-B);
    console.log(A*B);
    console.log(parseInt(A/B));
    console.log(A%B);
}

solution();