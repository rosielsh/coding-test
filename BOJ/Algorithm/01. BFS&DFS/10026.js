// 적록색약

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();

const area = input.map(x=>x.replace('\r','').split('').map(x => {
  if(x === 'R') return 0;
  else if(x === 'G') return 1;
  else if(x === 'B') return 2;
}));
const weakArea = area.map(x => x.map(y => y === 1?0:y));

const posX = [1, -1, 0, 0];
const posY = [0, 0, -1, 1];

function bfs(y, x, arr, std) {
  const needVisit = [[y, x]];

  while(needVisit.length) {
    [curY, curX] = needVisit.shift();

    for(let i=0; i<4; i++) {
      [adjY, adjX] = [curY+posY[i], curX+posX[i]];
      if(adjY < 0 || adjY >= N || adjX < 0 || adjX >= N) continue;
      if(arr[adjY][adjX] !== -1 && arr[adjY][adjX] === std) {
        arr[adjY][adjX] = -1; 
        needVisit.push([adjY, adjX]);
      }
    }
  }
}

function solution() {
  let cnt1 = 0;
  let cnt2 = 0;

  for(let i=0; i<N; i++) {
    for(let j=0; j<N; j++) {
      if(area[i][j] !== -1) {
        bfs(i, j, area, area[i][j]);
        cnt1++;
      }

      if(weakArea[i][j] !== -1) {
        bfs(i, j, weakArea, weakArea[i][j]);
        cnt2++;
      }
    }
  }
  return [cnt1, cnt2].join(' ');
}

console.log(solution());