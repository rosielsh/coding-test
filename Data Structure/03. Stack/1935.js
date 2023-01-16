// 문제 : 후위 표기식2
// 티어 : 실버 3

// 보통 중위 표기식 : (A+B)*(C+D)
// 후위 표기식 : AB+CD+*

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const exp = input.shift().replace('\r', '').split('');
const num = input.map(x=>+x);
const regex = /[A-Z]/;

function solution() {
    let answer;
    const stack = [];
    exp.forEach(x=>{
        if(regex.test(x)) { // 문자인 경우
            const idx = x.charCodeAt(0) - 65;
            stack.push(num[idx]);
        } else { // 연산자인 경우
            const p1 = stack.pop();
            const p2 = stack.pop();
            stack.push(eval(`${p2} ${x} ${p1}`));
        }
    })
    answer = stack[0].toFixed(2);
    return answer;
}

console.log(solution());