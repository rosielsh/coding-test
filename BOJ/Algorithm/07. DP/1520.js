// 내리막 길

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[MN, ...map] = require('fs').readFileSync(filePath).toString().trim().split('\n');
[M, N] = MN.split(' ').map(Number);
map = map.map(x=>x.split(' ').map(Number));

const route = Array.from({length: M}, ()=>Array(N).fill(-1));
route[M-1][N-1] = 1;
const dy = [0, 0, -1, 1];
const dx = [1, -1, 0, 0];

function dfs(y, x) {
  if(route[y][x] !== -1) return  route[y][x];

  let cnt = 0;

  for(let i=0; i<4; i++) {
    ny = y + dy[i];
    nx = x + dx[i];

    if(ny < 0 || ny >= M || nx < 0 || nx >= N) continue;
    if(map[ny][nx] >= map[y][x]) continue;

    cnt += dfs(ny, nx);
  }
  
  route[y][x] = cnt;

  return cnt;
}

console.log(dfs(0, 0));