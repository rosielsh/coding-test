// 전자레인지

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let T = +require('fs').readFileSync(filePath).toString().trim();

function solution() {
  let answer = [0, 0, 0];
  let std = [300, 60, 10];

  for(let i=0; i<3; i++) {
    if(T >= std[i]) {
      answer[i] = parseInt(T / std[i]);
      T %= std[i];
    }
  }

  return T !== 0 ? -1 : answer.join(' ');
}

console.log(solution());