// 문제 : 유기농 배추
// 티어 : 실버 2

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const T = +input.shift();
let M, N, K;
let field;

function DFS(startY, startX) {
  const needVisit = [[startY, startX]];
  const pos = [[0, -1], [0, 1], [-1, 0], [1, 0]];
  
  while(needVisit.length) {
    const [curY, curX] = needVisit.pop();
    
    for(let i=0; i<4; i++) {
      const adjY = curY + pos[i][0];
      const adjX = curX + pos[i][1];

      if(adjY < 0 || adjY >= N || adjX < 0 || adjX >= M) continue;

      if(field[adjY][adjX]) {
        field[adjY][adjX] = 0;
        needVisit.push([adjY, adjX]);
      }
    }
  }
}

function solution() {
  let answer;
  for(let i=0; i<T; i++) {
    answer = 0;
    [M, N, K] = input.shift().split(' ').map(x=>+x);
    field = Array.from({length: N}, ()=>Array(M).fill(0));
    for(let j=0; j<K; j++) {
      const [a, b] = input.shift().replace('\r', '').split(' ').map(x=>+x);
      field[b][a] = 1;
    }
    
    for(let i=0; i<N; i++) {
      for(let j=0; j<M; j++) {
        if(field[i][j]) {
          DFS(i, j);
          answer++;
        }
      }
    }

    console.log(answer);
  }
}

solution();