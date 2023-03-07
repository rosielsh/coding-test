// 로봇 청소기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, rcd, ...room] = require('fs').readFileSync(filePath).toString().trim().split('\n');
[N, M] = NM.split(' ').map(Number);
[r, c, d] = rcd.split(' ').map(Number);
room = room.map(x=>x.split(' ').map(Number));

// room (벽 : 1, 청소x :0, 청소0: -1)
// d (0: 위, 1: 오른쪽, 2: 아래, 3: 왼쪽) 

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
let cleanSpaceCnt = 0;

function simulation(startY, startX) {
  let curY = startY;
  let curX = startX;
  let direction = d; // 바라보는 방향 

  while(1) {
    // 아직 청소되지 않은 경우, 청소 
    if(!room[curY][curX]) {
      room[curY][curX] = -1;
      cleanSpaceCnt++;
    }

    // 현재 기준 4방향 검사 
    let isExist = false;
    for(let i=0; i<4; i++) {
      ny = curY + dy[i];
      nx = curX + dx[i];

      if(ny < 0 || ny >= N || nx < 0 || nx >= M) continue;
      if(!room[ny][nx]) isExist = true;
    }

    // 빈칸 x
    if(!isExist) {
      curY -= dy[direction];
      curX -= dx[direction];

      if(curY < 0 || curY >= N || curX < 0 || curX >= M || room[curY][curX] === 1) break;
      
    } else {
      // 반시계 방향으로 이동 
      for(let i=0; i<4; i++) {
        direction -= 1;
        if(direction === -1) direction = 3;

        ny = curY + dy[direction];
        nx = curX + dx[direction];

        if(ny < 0 || ny >= N || nx < 0 || nx >= M || room[ny][nx] !== 0) continue;

        curY = ny;
        curX = nx;
        break;
      }
     
    }
  } 

  return cleanSpaceCnt;
}

function solution() {
  let answer = simulation(r, c);
  return answer;
}

console.log(solution());