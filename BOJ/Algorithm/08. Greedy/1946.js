//  신입 사원

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const T = +input.shift();

function solution() {
  let answer;
  let N;
  let flag;
  let recruits = [];
  for(let i=0; i<T; i++) {
    answer = 1;
    recruits = [];
    N = +input.shift();
    recruits.push(...input.splice(0, N).map(x=>x.split(' ').map(Number)));
    recruits.sort((a, b) => a[0] - b[0]);
    flag = recruits[0][1];
    for(let k=1; k<N; k++) {
      if(recruits[k][1] < flag) { // 붙는 조건
        answer++;
        flag = recruits[k][1];
      }
    }
    console.log(answer);
  }
}

solution();