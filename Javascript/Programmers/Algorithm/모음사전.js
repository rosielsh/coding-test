const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const word = require('fs').readFileSync(filePath).toString().trim().split('');
const consonant = ['A', 'E', 'I', 'O', 'U'];
const combination = Array.from({length: 5}, () => 0);
let cnt = 0;
let answer = 0;

function solution(idx) {

  if(idx === 6) {
    return;
  }

  const c = combination.join('').replaceAll('0','');
  const w = word.join('');

  if(c === w) {
    answer = cnt;
    return;
  }

  cnt++;
  for(let i=0; i<5; i++) {
    combination[idx] = consonant[i];
    solution(idx+1);
    combination[idx] = 0;
  }
}

solution(0);
console.log(answer);