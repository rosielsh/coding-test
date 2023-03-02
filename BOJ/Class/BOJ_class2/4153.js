// 직각삼각형

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n').map(x=>x.split(' ').map(Number));

function solution() {
  let answer;
  let i=0;
  while(1) {
    answer = 'wrong';
    const side = input[i++].sort((a, b) => a-b);
    const sum = side.reduce((a, b) => a+b, 0);
    if(sum === 0) break;
    if(side[2]**2 === side[0]**2 + side[1]**2) answer = 'right';
    console.log(answer);
  }
}

solution();