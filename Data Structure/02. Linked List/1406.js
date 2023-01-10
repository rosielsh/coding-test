// 문제 : 에디터

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().replace(/\r/g, '').split('\n');
const left = input[0].split('');
const M = +input[1];
const right = [];

function solution() {
  let answer;
  
  for(let i=2; i< 2+M; i++) {
    let [cmd, val] = input[i].split(' ');
    switch(cmd) {
      case 'L': {
        if(left.length !== 0) {
          right.push(left.pop());
        }
        break;
      }
      case 'D': {
        if(right.length !== 0) {
          left.push(right.pop());
        }
        break;
      }
      case 'B': {
        if(left.length !== 0) {
          left.pop();
        }
        break;
      }
      case 'P': {
        left.push(val);
        break;
      }
    }
  }
  answer = [...left, ...right.reverse()];
  return answer.join('');
}

console.log(solution());