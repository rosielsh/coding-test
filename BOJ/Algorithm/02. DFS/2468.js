const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const area = input.map(x=>x.replace('\r','').split(' ').map(x=>+x));
let cnt;

function DFS(startY, startX, height) {
  const needVisit = [[startY, startX]];
  const pos = [[0, -1], [0, 1], [1, 0], [-1, 0]];

  while(needVisit.length) {
    const [curY, curX] = needVisit.pop();
    
    for(let i=0; i<4; i++) {
      const adjY = curY + pos[i][0];
      const adjX = curX + pos[i][1];

      if(adjY < 0 || adjY >= N || adjX < 0 || adjX >= N) continue;

      if(area[adjY][adjX] > height) { // height보다 높은 건물들만 안전영역
        area[adjY][adjX] = 0; // 방문 표시
        needVisit.push([adjY, adjX]);
      }
    }
    console.log(needVisit);
  }
} 
 
function solution() {
  let answer;
  cnt = 0;

  for(let h=1; h<100; h++) { // 높이
    for(let j=0; j<N; j++) {
      for(let k=0; k<N; k++) {
        DFS(j, k, h);  // 2차원 배열 돌면서 영역 갯수 카운트
      }
    }
  }
  return answer;
}

console.log(solution());