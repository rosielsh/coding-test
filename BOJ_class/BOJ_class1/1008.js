// 문제 : A/B
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [A, B] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(x=>+x);

function solution() {
    console.log(A/B);
}

solution();