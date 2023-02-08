// 민균이의 비밀번호

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const n = +input.shift();
const password = input.map(x=>x.replace('\r', ''));

function solution() {
  let answer;
  outerFor: for(let i=0; i<n-1; i++) {
    innerFor: for(let j=i; j<n; j++) {
      if(password[j].split('').reverse().join('') === password[i]) {
        answer = `${password[i].length} ${password[i][parseInt((password[i].length-1)/2)]}`;
        break outerFor;
      }
    }
  }
  return answer;
}

console.log(solution());