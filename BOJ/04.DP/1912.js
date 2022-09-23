// 문제 : 연속합
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const n = +input.shift();
const numList = input.shift().split(' ').map(x=>+x);

function solution() {
    for(let i = 1; i<n; i++) {
        numList[i] = Math.max(numList[i], numList[i-1]+numList[i]);
    }
    console.log(Math.max(...numList));
}

solution();