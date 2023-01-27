// 문제 : 스택
// 티어 : 실버 4
// 시간 : 

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const N = +input.shift();

function solution() {
    const st = [];
    let answer = [];
    for(let i=0; i<input.length; i++) {
        const [cmd, val] = input[i].split(' ');

        if(cmd === 'push') st.push(+val);
        else if(cmd === 'pop') answer.push(st.length === 0 ? -1:st.pop());
        else if(cmd === 'size') answer.push(st.length);
        else if(cmd === 'empty') answer.push(st.length === 0 ? 1:0);
        else if(cmd === 'top') answer.push(st.length === 0 ? -1:st[st.length-1]);
    }
    return answer.join('\n');
}

console.log(solution());