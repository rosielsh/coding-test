// 문제 : IOIOI
// 1트 : 50점 -> KMP로 다시 풀어보기
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const M = +input.shift();
const S = input.shift();

function solution() {
    const p = 'I' + 'OI'.repeat(N);
    let cnt = 0;
    S.split('').map((x, idx) => {
        if(x === 'I' && S.substring(idx, idx+p.length) === p) {
            cnt++;
        }
    })

    console.log(cnt);
}

solution();