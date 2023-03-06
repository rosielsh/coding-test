// 뱀

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');

const N = +input[0];
const K = +input[1];
const apple = input.slice(2, 2+K).map(x=>x.split(' ').map(Number));
const L = +input[2+K];
const directionList = input.slice(3+K).map(x=>x.split(' '));
const board = Array.from({length: N}, ()=>Array(N).fill(-1));

// 현재 board 
// 사과 : infinity, 지나온 적이 없는 곳 : -1, 그 외 : 0부터 채워질 것
for(let i=0; i<K; i++) {
  board[apple[i][0]-1][apple[i][1]-1] = Infinity; // 사과 저장
}

let snakeSize = 1;

// 시작 지점, 방향 : left/right/up/down, 경과 시간  
function simuation(startY, startX, direction, time) {
  const stack = [[startY, startX, direction, time]];
  let nextDirection = '';
  
  while(stack.length) {
    [curY, curX, direction, time] = stack.pop();

    // 범위를 벗어났다면 -> 종료 조건
    if(curY < 0 || curY >= N || curX < 0 || curX >= N) {
      return time;
    }

    // 이미 지나온 적이 있다면 자신의 몸인지 검사, 뱀의 몸이라면 => 종료 조건 
    if(board[curY][curX] > 0 && board[curY][curX] !== Infinity) {
        if(board[curY][curX] >= time - snakeSize) {
          return time;
        }
    }
    
    // 이동한 곳에 사과가 있다면 
    if(board[curY][curX] === Infinity) {
      snakeSize += 1;
    } 

    board[curY][curX] = time;
    nextDirection = direction;

    // 방향 바꿔야 한다면  
    if(directionList.length && Number(directionList[0][0]) === time) {
      d = directionList[0][1].replace('\r','');
      if(d === 'L') {
        if(direction === 'left') nextDirection = 'down';
        else if(direction === 'right') nextDirection = 'up';
        else if(direction === 'up') nextDirection = 'left';
        else if(direction === 'down') nextDirection = 'right';
      } else if(d === 'D') {
        if(direction === 'left') nextDirection = 'up';
        else if(direction === 'right') nextDirection = 'down';
        else if(direction === 'up') nextDirection = 'right';
        else if(direction === 'down') nextDirection = 'left';
      }
      directionList.shift();
    }

    // 다음 좌표 설정 
    let ny = 0;
    let nx = 0;
    if(nextDirection === 'left') { // 왼쪽으로 이동 
      [ny, nx] = [curY, curX - 1];
    } else if(nextDirection === 'right') { // 오른쪽으로 이동 
      [ny, nx] = [curY, curX + 1];
    } else if(nextDirection === 'up') { // 위쪽으로 이동 
      [ny, nx] = [curY - 1, curX];
    } else if(nextDirection === 'down') { // 아래쪽으로 이동 
      [ny, nx] = [curY + 1, curX];
    }
    // 다음 방향으로 검사한다 
    stack.push([ny, nx, nextDirection, time+1]);
  }
}

board[0][0] = 0;
console.log(simuation(0, 0, 'right', 0));