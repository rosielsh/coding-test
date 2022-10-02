// 문제 : 최댓값
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n').map(x=>+x);


function solution() {
    const max = Math.max(...input);
    const idx = input.indexOf(max);

    console.log(max+"\n"+(idx+1));
}

solution();