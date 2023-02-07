// 하노이 탑 이동 순서

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = +require('fs').readFileSync(filePath).toString().trim();
let answer = 0;
let route = '';

function hanoi(num, from, to, other) {
  if(num === 0) return;
  hanoi(num-1, from, other, to);
  route += `${from} ${to}\n`;
  hanoi(num-1, other, to, from);
  answer++;
}

hanoi(input, 1, 3, 2);
console.log(answer);
console.log(route);