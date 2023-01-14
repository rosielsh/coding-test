// 문제 : 덱
// 티어 : 실버 4
// 시간 : 10분

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();

function solution() {
    let answer = [];
    const deque = [];
    for(let i of input) {
        const [cmd, val] = i.replace('\r', '').split(' ');
        switch(cmd) {
            case 'push_front': {
                deque.unshift(+val);
                break;
            }
            case 'push_back': {
                deque.push(+val);
                break;
            }
            case 'pop_front': {
                answer.push(deque.length ? deque.shift() : -1);
                break;
            }
            case 'pop_back': {
                answer.push(deque.length ? deque.pop() : -1);
                break;
            }
            case 'size': {
                answer.push(deque.length);
                break;
            }
            case 'empty': {
                answer.push(deque.length?0:1);
                break;
            }
            case 'front': {
                answer.push(deque.length? deque[0]:-1);
                break;
            }
            case 'back': {
                answer.push(deque.length?deque[deque.length-1]:-1);
                break;
            }
        }
    }

    return answer.join('\n');
}

console.log(solution());