// 문제 : 단어 정렬
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const T = +input.shift();
const words = [];
for(let i = 0; i<T; i++) {
    let r = input.shift().replace('\r', '');
    if(words.includes(r)) continue;
    else words.push(r);
}

function solution() {

    words.sort(((a, b) => {
        if(a.length === b.length) { // 사전순 
            return a === b ? 0 : a < b ? -1 : 1;
        }
        else return a.length -b.length;
    }))  

    words.map(x => {
        console.log(x);
    })
}

solution();