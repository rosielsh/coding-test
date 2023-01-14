// 문제 : 회전하는 큐
// 티어 : 실버 4
// 시간 : 40분

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(x=>+x);
const find = input.shift().split(' ').map(x=>+x);
const deque = Array.from({length: N}, (_, idx) => idx+1);

function solution() {
    let answer = 0;
    find.forEach(x=> {
        const f_idx = deque.findIndex(y=>y === x);
        if(f_idx === 0) {
            deque.shift();
        } 
        else {
            if(f_idx < (deque.length / 2)) { // 배열의 왼쪽
                for(let i=0; i<f_idx; i++) {
                    deque.push(deque.shift());
                }
                deque.shift();
                answer+=f_idx;
            }
            else { // 배열의 오른쪽
                for(let i=0; i<(deque.length - f_idx); i++) {
                    deque.unshift(deque.pop());
                }
                deque.shift();
                answer+=(deque.length - f_idx + 1);
            }
        }
    })

    return answer;
}

console.log(solution());