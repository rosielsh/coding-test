// 문제 : 직사각형에서 탈출
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [x, y, w, h] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(x=>+x);

function solution() {
    console.log(Math.min(w-x, x, y, h-y));
}

solution();