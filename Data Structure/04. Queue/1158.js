// 문제 : 요세푸스 문제
// 티어 : 실버 4
// 시간 : 15분

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const [N, K] = input[0].split(' ').map(x=>+x);
const queue = Array.from({length: N}, (_, index) => index+1);

function solution() {
    const answer = [];
    let cnt = 1;
    while(queue.length) {
        const p = queue.shift();
        if(cnt % K === 0) answer.push(p);
        else queue.push(p); 
        cnt++;
    }
    return `<${answer.join(', ')}>`;
}

console.log(solution());