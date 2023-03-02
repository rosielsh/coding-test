// 십자가 찾기

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, ...board] = require('fs').readFileSync(filePath).toString().trim().split('\n');
[N, M] = NM.split(' ').map(Number);
board = board.map(x=>x.replace('\r', '').split(''));

function searchCrossSize(y, x) {
  let size = [0, 0, 0, 0];

  // 상
  for(let i=y-1; i>=0; i--) {
    if(board[i][x] === '*') size[0]++;
    else break;
  }

  // 하
  for(let i=y+1; i<N; i++) {
    if(board[i][x] === '*') size[1]++;
    else break;
  }

  // 좌
  for(let i=x-1; i>=0; i--) {
    if(board[y][i] === '*') size[2]++;
    else break;
  }

  // 
  for(let i=x+1; i<M; i++) {
    if(board[y][i] === '*') size[3]++;
    else break;
  }

  let len = Number.MAX_SAFE_INTEGER;
  for(let i=0; i<4; i++) {
    if(size[i]) {
      len = Math.min(len, size[i]);
    } else return 0;
  }
  return len;
}

function makeCross(crossInfo) {
  for(let i=0; i<crossInfo.length; i++) {
    [y, x, size] = crossInfo[i];
    [y, x] = [y-1, x-1];
    board[y][x] = '.';
    for(let s=1; s<=size; s++) {
      board[y+s][x] = '.';
      board[y-s][x] = '.';
      board[y][x+s] = '.';
      board[y][x-s] = '.';
    }
  }
}

function isImpossible() {
  let flag = false;
  for(let i=0; i<N; i++) {
    for(let j=0; j<M; j++) {
      if(board[i][j] === '*') flag = true;
    }
  }
  return flag;
}

function solution() {
  let answer = [];
  const crossInfo = [];
  for(let i=0; i<N; i++) {
    for(let j=0; j<M; j++) {
      if(board[i][j] === '*') {
         size = searchCrossSize(i, j);
         if(size) crossInfo.push([i+1, j+1, size]);
      }
    }
  }

  makeCross(crossInfo);
  if(isImpossible()) return -1;

  let sum = 0;
  for(let i=0; i<crossInfo.length; i++) {
    [y, x, size] = crossInfo[i];
    sum += size;
    if(size > 1) {
      while(size >= 1) {
        answer.push([y, x, size--]);
      }
    } else answer.push([y, x, size]);
  }

  answer.unshift([sum]);
  return answer.map(x=>x.join(' ')).join('\n');
}

console.log(solution());