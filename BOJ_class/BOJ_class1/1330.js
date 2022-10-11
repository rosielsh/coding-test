// 문제 : 두 수 비교하기
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [A, B] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(x=>+x);

function solution() {
    let r = '';
    if(A > B) r = '>';
    else if(A === B) r = '==';
    else if(A < B) r = '<';
    console.log(r);
}

solution();