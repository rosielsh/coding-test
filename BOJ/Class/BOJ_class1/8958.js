// 문제 : OX퀴즈
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const T = +input.shift();

function solution() {
    for(let i = 0; i < T; i++) {
        const str = input[i].replace('\r', '').split('X');
        let result = 0;

        str.map(x => {
            if(x !== '') result += (x.length * (x.length+1))/2;
        })

        console.log(result);
    }
}

solution();