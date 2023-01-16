// 문제 : 균형잡힌 세상
// 티어 : 실버 4

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const bracket = ['(', '[', ']', ')'];
const n = input.length;
let arr = [];

function solution() {
  let ans_list = [];
  let answer;
  let stack;
  for(let i=0; i<n-1; i++) {
    arr = input[i].split('').filter(x=>bracket.includes(x));
    
    if(!arr.length) {
        ans_list.push('yes');
        continue;
    }
    answer = 'yes';
    stack = [];
    for(let j=0; j<arr.length;j++) {
        if(arr[j] === '(' || arr[j] === '[') stack.push(arr[j]);
        else {
            if(!stack.length) answer = 'no';
            else {
                const p = stack.pop();
                if(p === '[' && arr[j] === ')')  answer = 'no';
                if(p === '(' && arr[j] === ']') answer = 'no';
            }
        }
    }

    if(stack.length) answer = 'no';
    ans_list.push(answer === 'no' ? 'no':'yes');
  }
  return ans_list.join('\n');
}

console.log(solution());