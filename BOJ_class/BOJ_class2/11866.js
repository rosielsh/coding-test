// 문제 : 요세푸스 문제 0
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const [N, K] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(x=>+x);
const queue = Array.from({length: N}, (_, i) => i+1);

function solution() {
    const result = [];
    while(queue.length !== 0) {
        for(let i = 0; i<K-1; i++) {
            const num = queue.shift();
            queue.push(num);
        }
        result.push(queue.shift());
    }
    console.log(`<${result.join(', ')}>`);
}

solution();