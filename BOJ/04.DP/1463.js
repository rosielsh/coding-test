// 문제 : 1로 만들기
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const N = +input[0];
const cntList = Array.from({length: N+1}, ()=>0);

function solution() {
    for (let i = 2; i <= N; i++) {
        cntList[i] = cntList[i - 1] + 1;
        if (i % 2 === 0) cntList[i] = Math.min(cntList[i/2] + 1, cntList[i]);
        if (i % 3 === 0) cntList[i] = Math.min(cntList[i/3] + 1, cntList[i]);
    }
    console.log(cntList[N]);
}

solution();