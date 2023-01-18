// 문제 : 미로 탐색
// 티어 : 실버 1 
// 인접한 칸, 최단거리 -> BFS

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(x=>+x);
const miro = [];
for(let i=0; i<N; i++) {
  miro.push(input[i].split('').map(x=>+x));
}

function solution() {
  const needVisit = [[0,0,1]]; // 현재 노드 (y,x,이동횟수)
  const pos = [[0, -1], [1, 0], [0, 1], [-1, 0]]; // 상하좌우

  while(needVisit.length) {
    const [ypos, xpos, cnt] = needVisit.shift();

    for(let i=0; i<4; i++) {
      const [Y, X] = [ypos + pos[i][0], xpos + pos[i][1]];
      
      if(Y < 0 || Y > N-1 || X < 0 || X > M-1) continue;

      if(miro[Y][X] === 1) {
        miro[Y][X] = cnt + 1; // 방문수 처리
        needVisit.push([Y,X,cnt+1]);
      }
    }
  }

  return miro[N-1][M-1];
}

console.log(solution());