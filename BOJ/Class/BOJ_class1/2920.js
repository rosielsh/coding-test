// 문제 : 음계
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = require('fs').readFileSync(filePath).toString().split(' ').map(x=>+x);
input = input.join(' ');

function solution() {
    const asc = [...Array(8)].map((v, i) => i+1);
    const desc = [...Array(8)].map((v, i) => 8-i);
    let result = '';

    if(input === asc.join(' ')) result = 'ascending';
    else if(input === desc.join(' ')) result = 'descending';
    else result = 'mixed';

    console.log(result);
}

solution();