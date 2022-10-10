// 문제 : 좌표 정렬하기
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const pos = [];
for(let i = 0; i<input.length; i++) {
    pos.push(input[i].split(' ').map(x =>+x));
}

function solution() {
    let result = '';
    pos.sort((a, b) => {
        if(a[0] !== b[0]) return a[0] - b[0];
        else return a[1] - b[1];
    })

    pos.map(x => {
        result += `${x[0]} ${x[1]}\n`;
    })

    console.log(result);
}

solution();