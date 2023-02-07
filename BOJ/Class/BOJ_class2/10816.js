// 숫자 카드 2

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const card = input[1].split(' ').map(Number);
const M = +input[2];
const search = input[3].split(' ').map(Number);

const map = new Map();
card.forEach(x => {
  if(map.get(String(x))) { // 숫자의 개수가 저장돼있음
    map.set(String(x), map.get(String(x))+1);
  } else {
    map.set(String(x), 1);
  }
});

function solution() {
  let answer = [];
  for(let i=0; i<M; i++) {
    if(map.has(String(search[i]))) {
      answer.push(map.get(String(search[i])));
    } else {
      answer.push(0);
    }
  }
  return answer.join(' ');
}

console.log(solution());