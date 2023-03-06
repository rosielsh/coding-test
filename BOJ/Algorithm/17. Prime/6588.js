// 골드바흐의 추측

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n').map(Number).slice(0, -1);
const maxValue = Math.max(...input);
let prime = [];
sieve();

function sieve() {
  const arr = Array.from({length: maxValue+1}, (_, idx)=>1);
  arr[1] = 0;

  for(let i=2; i<=Math.sqrt(maxValue); i++) {
    for(let j=i*2; j<=maxValue; j+=i) {
      if(arr[j]) arr[j] = 0;
    }
  }

  prime = [...arr];
}

function calcPossible(num) {
  for(let i=3; i<num; i+=2) {
    if(prime[i] && prime[num-i]) {
      return [i, num-i];
    }
  }
  return -1;
}

function solution() {
  let answer = '';
  for(let i=0; i<input.length; i++) {
    const result = calcPossible(input[i]);
    if(result === -1) answer += "Goldbach's conjecture is wrong.\n";
    else answer += `${input[i]} = ${result[0]} + ${result[1]}\n`;
  }
  return answer;
}

console.log(solution());