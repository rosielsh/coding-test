// 문제 : 단지번호 붙이기
// 티어 : 실버 1

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const map = input.map(x=>x.replace('\r', '').split('').map(x=>+x));
let cnt;

function BFS(startY, startX) {
  const needVisit = [[startY, startX]];
  const pos = [[0, 1], [1, 0], [-1, 0], [0, -1]];
  cnt = 0;

  while(needVisit.length) {
    const [ypos, xpos] = needVisit.shift();
    
    for(let i=0; i<4; i++) {
      const Y = ypos + pos[i][0];
      const X = xpos + pos[i][1];

      if(Y < 0 || Y >= N || X < 0|| X >= N) continue;

      if(map[Y][X]) {
        map[Y][X] = 0;
        needVisit.push([Y, X]);
        cnt++;
      }
    }
  }
  return cnt === 0?1:cnt;
}

function solution() {
  let answer = [];

  for(let i=0; i<N; i++) {
    for(let j=0; j<N; j++) {
      if(map[i][j]) {
        answer.push(BFS(i,j));
      }
    }
  }
  return [answer.length, ...answer.sort((a,b)=>a-b)].join('\n');
}

console.log(solution());