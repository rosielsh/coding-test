// 나무 자르기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const tree = input[1].split(' ').map(Number).sort((a, b)=>a-b);

function solution() {
  let left = 0;
  let right = tree[N-1];
  let mid;
  let sum;
  while(left <= right) {
    sum = 0;
    mid = parseInt((left+right)/2);
    
    for(let i=0; i<N; i++) {
      sum += tree[i]>mid ? tree[i]-mid:0;
    }

    if(sum >= M) {
      left = mid+1;
    } else {
      right = mid-1;
    }
  }

  return right;
}

console.log(solution());