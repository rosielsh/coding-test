// 문제 : 카드 문자열
// 티어 : 실버 4
// 시간 : 20분

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const T = +input.shift();

function solution() {
    for(let i=0; i<T*2; i+=2) {
        const N = input[i];
        const card = input[i+1].replace('\r','').split(' ');
        const deque = [card.shift()];
        
        while(card.length) {
            const c = card.shift();
            if(c.charCodeAt(0) <= deque[0].charCodeAt(0)) deque.unshift(c);
            else deque.push(c);
        }
        console.log(deque.join(''));
    }
}

solution();