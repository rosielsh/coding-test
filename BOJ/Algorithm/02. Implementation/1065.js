// 한수

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const N = +require('fs').readFileSync(filePath).toString().trim();

function solution() {
  let answer = 0;
  if(N < 100) return N;
  else if(100 <= N && N <= 110) {
    return 99;
  }
  else {
    for(let i=110; i<=N; i++) {
      str = String(i);
      if(str[1] - str[0] === str[2] - str[1]) {
        answer++;
      }
    }
  }
  return answer+99;
}

console.log(solution());