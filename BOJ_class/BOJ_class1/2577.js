// 문제 : 숫자의 개수
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n').map(x=>+x);


function solution() {
    const result = input.reduce((p, cur) => p*cur, 1);
    const arr = Array.from({length: 10}, () => 0);

    String(result).split('').map(x => {
        arr[x] += 1;
    })
    console.log(arr.join('\n'));
}

solution();