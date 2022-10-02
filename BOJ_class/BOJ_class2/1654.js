// 문제 : 스택 수열
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [n, ...nums] = require('fs').readFileSync(filePath).toString().trim().split('\n').map(x=>+x);

function solution() {
    const stack = [];
    let p = 1;
    let result = '';
    
    for(let i = 0; i<n; i++) {
        const num = nums[i];

        while(p <= num) {
            stack.push(p++);
            result += '+';
        }

        if(stack.pop() !== num) {
            console.log('NO');
            return;
        }
        result += '-';
    }

    console.log(result.split('').join('\n'));
}

solution();