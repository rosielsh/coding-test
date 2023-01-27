// 문제 : 풍선 터뜨리기
// 티어 : 실버 3
// 시간 : 5:16

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const deque = input[0].split(' ').map(x=>+x);
const numArr = Array.from({length: N}, (_, idx) => idx+1);

function solution() {
    let answer = [numArr.shift()]; // numArr = [2,3,4,5]
    let val = deque.shift(); 
    
    while(deque.length) {
        const c = deque[0];
        for(let i=0; i<c; i++) {
            deque.push(deque.shift());
            numArr.push(numArr.shift());
        }
        deque.shift();
        answer.push(numArr.shift());
        console.log(deque);
    }

    return answer;
}

console.log(solution());