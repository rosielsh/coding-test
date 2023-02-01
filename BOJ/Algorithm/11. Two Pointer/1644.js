// 소수의 연속합

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = +require('fs').readFileSync(filePath).toString().trim();
let arr;
const prime = primeSieve(N);

function primeSieve(N) {
  arr = Array.from({length: N+1}, (_, idx)=>idx);
  for(let i=2; i<=N; i++) {
    if(!arr[i]) continue;

    for(let j=i*2; j<=N; j+=i) {
      if(arr[j]) arr[j] = 0;
    }
  }
  return arr.filter(x=>x!==1 && x!==0);
}

function calcSum(start, end) {
  let sum = 0;
  for(let i=start; i<=end; i++) {
    sum += prime[i];
  }
  return sum;
}

function solution() {
  let answer = 0;
  let left = 0;
  let right = 1;

  while(left !== right) {
    sum = calcSum(left, right);
    if(sum === N) {
      answer++;
      right++;
    } else if(sum < N) right++;
    else left++;
  }

  if(N === prime.at(-1)) answer++;

  return answer;
}

console.log(solution());