// 문제 : 좋은 단어
// 티어 : 실버 4

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();

function solution() {
    let answer = 0;
    for(let i=0; i<N; i++) {
        const stack = [];
        let isGood = true;
        const str = input[i].replace('\r', '').split('');
        str.forEach(x=>{
            if(!stack.length) stack.push(x);
            else {
                if(stack[stack.length-1] === x) stack.pop();
                else stack.push(x);
            }
        })

        isGood = stack.length ? false:true;
        if(isGood) answer++;
    }
    return answer;
}

console.log(solution());