// 문제 : 단어 뒤집기 2
// 티어 : 실버 3

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');

function solution() {
    let answer = '';
    const str = input[0].split('');
    let isTag = false;
    let stack = [];

    str.forEach(x=> {
        if(x === '<') {
            isTag = true;
            answer += stack.reverse().join('') + x;
            stack = [];
        }
        else if(x === '>') {
            answer += x;
            isTag = false;
        }
        else if(x === ' ') {
            if(isTag) answer += ' ';
            else {
                answer += stack.reverse().join('') + ' ';
                stack = [];
            }
        }
        else {
            if(isTag) answer += x;
            else stack.push(x);
        }
    })
    if(stack.length) answer += stack.reverse().join('');
    return answer;
}

console.log(solution());