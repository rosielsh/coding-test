// 문제 : 단어의 개수
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');

function solution() {
    let cnt = 0;
    input[0].trim().split(' ').map((ele) => {
        if(ele !== '') cnt++;
    })
    console.log(cnt);
}

solution();