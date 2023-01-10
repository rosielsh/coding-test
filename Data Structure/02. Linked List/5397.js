// 문제 : 키로거
// 시간 : 20분

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().replace(/\r/g, '').split('\n');
const T = +input[0];

function solution() {
  let answer;
  for(let i=0; i<T; i++) {
    const left = [];
    const right = [];
    const str = input[1+i].split('');
    str.forEach(x => {
      switch(x) {
        case '<': {
          if(left.length !== 0) {
            right.push(left.pop());
          }
          break;
        }
        case '>': {
          if(right.length !== 0) {
            left.push(right.pop());
          }
          break;
        }
        case '-': {
          if(left.length !== 0) {
            left.pop();
          }
          break;
        }
        default:
          left.push(x);
      }
    })
    answer = [...left, ...right.reverse()];
    console.log(answer.join(''));
  }
}

solution();