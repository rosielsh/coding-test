// 문제 : 괄호
// 티어 : 실버 4

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const T = +input.shift();

function solution() {
    for(let i=0; i<T; i++) {
        let answer = 'YES';
        const stack = [];
        const str = input[i];
        for(let j=0; j<str.length; j++) {
            if(str[j] === '(') stack.push('(');
            else {
                if(!stack.pop()) {
                    answer = 'NO';
                    break;
                }
            }
        }

        if(stack.length !== 0) answer = 'NO';

        console.log(answer);
    }
}

solution();