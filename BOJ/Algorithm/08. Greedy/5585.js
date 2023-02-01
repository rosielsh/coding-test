const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let n = +require('fs').readFileSync(filePath).toString().trim();
const changes = [500, 100, 50, 10, 5, 1];

function solution() {
  let answer = 0;
  n = 1000 - n;
  for(let i=0; i<6; i++) {
    if(n >= changes[i]) {
      answer += parseInt(n/changes[i]);
      n %= changes[i];
    }
  }

  return answer;
}

console.log(solution());