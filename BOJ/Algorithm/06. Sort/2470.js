const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const liquid = input[1].split(' ').map(Number).sort((a,b)=>a-b);

function solution() {
  let left = 0;
  let right = liquid.length-1;
  let sum = liquid[left] + liquid[right];
  let answer = [liquid[left], liquid[right]];
  
  while(left !== right) {
    if(Math.abs(liquid[left] + liquid[right]) < Math.abs(sum)) {
      sum = liquid[left] + liquid[right];
      answer = [liquid[left], liquid[right]];
    }
    if(Math.abs(liquid[left] + liquid[right-1]) >= Math.abs(liquid[left+1] + liquid[right] )) {
      left++;
    } else right--;
  }

  return answer.sort((a, b) => a - b).join(' ');
}

console.log(solution());