const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split("\n").map(x=>x.replace("\r", "").split(""));
let map = input.map(x => [...x]);

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function bfs(x, y) {
  const queue = [[x, y]];
  const std = map[x][y];
  map[x][y] = ".";
  visited[x][y] = true;

  let cnt = 1;
  while(queue.length) {
    const [cx, cy] = queue.shift();
    
    for(let i=0; i<4; i++) {
      const nx = cx + dx[i];
      const ny = cy + dy[i];

      if(nx < 0 || nx >= 12 || ny < 0 || ny >= 6 || map[nx][ny] === "." || map[nx][ny] !== std) continue;
      queue.push([nx, ny]);
      map[nx][ny] = ".";
      visited[nx][ny] = true;
      cnt++;
    }
  }

  return cnt;
}

function moveTemp() {
  for(let j=0; j<6; j++) {
    const stack = [];
    let i = 0;
    while(i < 12) {
      if(map[i][j] !== ".") {
        stack.push(map[i][j]);
        map[i][j] = ".";
      }
      i++;
    }

    let k = 11;
    while(stack.length > 0) {
        map[k][j] = stack.pop();
        k--;
    }
  }
}

let answer = 0;
let isContinue = true;
let visited;

while(isContinue) {
  visited = Array.from({length: 12}, () => Array(6).fill(false));
  isContinue = false;

  for(let i=0; i<12; i++) {
    for(let j=0; j<6; j++) {
      if(map[i][j] === "." || visited[i][j]) continue;
      const copyMap = map.map(x =>[...x]);
      const res = bfs(i, j);

      if(res >= 4) {
        isContinue = true;
      } else map = copyMap.map(x => [...x]);
    }
  }

  if(isContinue) {
    moveTemp();
    answer++; // 연쇄 수 + 1
  }
  else break;
}


console.log(answer);