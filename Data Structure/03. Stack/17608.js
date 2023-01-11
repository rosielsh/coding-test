// 문제 : 막대기
// 티어 : 브론즈 2
// 시간 : 30분

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n').map(x=>+x);
const N = +input.shift();
const stack = input;

function solution() {
    let max = input.pop();
    let answer = 1;
    while(stack.length !== 0) {
        const p = stack.pop();
        if(p > max) {
            answer += 1;
            max = p;
        }
    }
    return answer;
}

console.log(solution());