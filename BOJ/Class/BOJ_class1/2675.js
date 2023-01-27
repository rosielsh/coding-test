// 문제 : 문자열 반복
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const T = +input.shift();

function solution() {
    for(let i=0; i<T; i++) {
        const [n, str] = input.shift().split(' ');

        let result = '';
        str.split('').map(x => {
            result += x.repeat(+n);
        })

        console.log(result);
    }
}

solution();