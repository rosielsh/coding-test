// 문제 : 나머지
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n').map(x=>+x);

function solution() {
    const obj = {};

    input.map(x => {
        const r = x % 42;
        if(!Object.keys(obj).includes(r)) obj[r] = 1;
    })

    console.log(Object.keys(obj).length);
}

solution();