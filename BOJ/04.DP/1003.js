// 문제 : 피보나치 함수
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const T = +input.shift();
const maxNum = Math.max(...input);
const cntList = [[1, 0], [0, 1]];

const calcCnt = () => {
    for(let i = 2; i <= maxNum; i++){
        cntList.push([cntList[i-2][0]+cntList[i-1][0], cntList[i-2][1]+cntList[i-1][1]])
    }
}


function solution() {
    calcCnt();
    for(let i = 0; i < T; i++) {
        console.log(cntList[+input.shift()].join(' '));
    }
}

solution();