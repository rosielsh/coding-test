// 문자열 폭팔

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[str, explosion] = require('fs').readFileSync(filePath).toString().trim().split('\n');
str = str.replace('\r', '').split('');
explosionStr = explosion.replace('\r', '');

function solution() {
  let stack = [];
  for(let i=0; i<str.length; i++) {
    stack.push(str[i]); 
    if(str[i] === explosionStr.at(-1)) {
      if(stack.slice(-explosionStr.length).join('') === explosionStr) {
        for(let j=0; j<explosionStr.length; j++) {
          stack.pop();
        }
      }
    }
  }

  return stack.length === 0 ? 'FRULA' : stack.join('');
}

console.log(solution());