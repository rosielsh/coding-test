// 문제 : A+B - 4
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution() {
    const l = input.length;
    for(let i = 0; i<l; i++) {
        const [a, b] = input.shift().split(' ').map(x=>+x);
        console.log(a+b);
    }
}

solution();