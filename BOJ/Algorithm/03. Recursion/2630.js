// 색종이 만들기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...paper] = require('fs').readFileSync(filePath).toString().trim().split('\n');
N = +N;
paper = paper.map(x=>x.split(' ').map(Number));
let blue = 0;
let white = 0;

function solution(r, c, len) {
  if(len === 1) {
    if(paper[r][c]) blue += 1;
    else white += 1;
    return;
  } 

  let sum = 0;
  for(let i=r; i<=r+len-1; i++) {
    for(let j=c; j<=c+len-1; j++) {
      sum += paper[i][j];
    } 
  }

  if(sum === 0) {
    white += 1;
    return;
  }

  if(sum === len*len) {
    blue += 1;
    return;
  }

  let nextLen = parseInt(len/2);
  solution(r, c, nextLen);
  solution(r+nextLen, c, nextLen);
  solution(r, c+nextLen, nextLen);
  solution(r+nextLen, c+nextLen, nextLen);
}

solution(0, 0, N);
console.log(`${white}\n${blue}`);