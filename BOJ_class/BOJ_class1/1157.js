// 문제 : 단어 공부
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const str = require('fs').readFileSync(filePath).toString().trim().toLowerCase().split('');

function solution() {
    let result = '';
    const obj = {};

    str.map(x => {
        if(x in obj) obj[x] += 1;
        else obj[x] = 1;
    })

    let max = Math.max(...Object.values(obj));
    let cnt = Object.values(obj).reduce((cnt, ele) => {
        return cnt + (max === ele)
    }, 0)
    
    if(cnt !== 1) result = "?"
    else result = Object.keys(obj).find(x => obj[x] === max).toUpperCase();
    
    console.log(result);
}

solution();
