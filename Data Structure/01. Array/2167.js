// 나중에 DP로 다시 풀어볼 것

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(x=>+x);
const arr = [];
for(let i=0; i<n; i++) {
    arr[i] = input.shift().split(' ').map(x=>+x);
}
const c = +input.shift();

function solution() {
    for(let i=0; i<c; i++) {
        let answer = 0;
        const [a, b, c, d] = input.shift().split(' ').map(x=>+x);
        for(let j=a-1; j<=c-1; j++) {
            for(let k=b-1; k<=d-1; k++) {
                answer += arr[j][k];
            }
        }
        console.log(answer);
    }
}

solution();