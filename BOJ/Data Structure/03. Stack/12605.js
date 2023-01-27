// 문제 : 단어순서 뒤집기
// 티어 : 브론즈 1
// 시간 : 10분

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().split(/\n+/).map(x=>x.split(' ').reverse());
const N = +input.shift();

function solution() {
    for(let i=0; i<N; i++) {
        console.log(`Case #${i+1}: ${input[i].join(' ')}`)
    }
}

solution();