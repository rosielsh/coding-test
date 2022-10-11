// 문제 : A+B - 3
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const T = +input.shift();

function solution() {
    for(let i = 0; i<T; i++) {
        const [a, b] = input.shift().split(' ').map(x=>+x);
        console.log(a+b);
    }
}

solution();