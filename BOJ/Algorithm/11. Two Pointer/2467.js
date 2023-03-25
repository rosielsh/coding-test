// 용액

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, liquid] = require('fs').readFileSync(filePath).toString().trim().split('\n');
N = +N;
liquid = liquid.split(' ').map(Number);

function solution() {
  let answer = [];
  let minSum = Number.MAX_SAFE_INTEGER;
  
  if(liquid[0] > 0) return `${liquid[0]} ${liquid[1]}`;

  if(liquid[N-1] < 0) return `${liquid[N-2]} ${liquid[N-1]}`;

  let left = 0;
  let right = N-1;
  let sum;

  while(left < right) {
    sum = liquid[left] + liquid[right];

    if(Math.abs(minSum) > Math.abs(sum)) {
      answer = [liquid[left], liquid[right]];
      minSum = sum;
    }

    if(sum === 0) {
      return `${liquid[left]} ${liquid[right]}`;
    }

    // 합이 0보다 더 크면 
    else if(sum > 0) {
      right--;
    }

    else {
      left++;
    }
  }
  return answer.join(' ');
}

console.log(solution());
