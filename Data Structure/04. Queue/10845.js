// 문제 : 큐
// 티어 : 실버 4
// 시간 : 12분

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');
const N = +input.shift();

function solution() {
    const answer = [];
    const queue = [];
    for(let i=0; i<N; i++) {
        const [cmd, val] = input[i].replace('\r','').split(' ');
        switch(cmd) {
            case 'push': {
                queue.push(val);
                break;
            }
            case 'pop': {
                if(queue.length === 0) answer.push(-1);
                else answer.push(queue.shift());
                break;
            }
            case 'size': {
                answer.push(queue.length);
                break;
            }
            case 'empty': {
                answer.push(queue.length === 0?1:0);
                break;
            }
            case 'front': {
                if(queue.length === 0) answer.push(-1);
                else answer.push(queue[0]);
                break;
            }
            case 'back': {
                if(queue.length === 0) answer.push(-1);
                else answer.push(queue[queue.length-1]);
                break;
            }
        }
    }
    return answer.join('\n');
}

console.log(solution());