const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, ...space] = require('fs').readFileSync(filePath).toString().trim().split('\n');
N = +N;
space = space.map(x=>x.split(' ').map(Number));
let sharkkSize = 2;
let sharkPos = [];
let fishPos = [];

function searchEatableFish() {
  const pos = [];
  for(let i=0; i<N; i++) {
    for(let j=0; j<N; j++) {
      if(space[i][j] < sharkkSize && space[i][j] !== 0) pos.push([i, j]);
    }
  }
  return pos;
}

function searchSharkPos() {
  for(let i=0; i<N; i++) {
    for(let j=0; j<N; j++) {
      if(space[i][j] === 9) return [i, j];
    }
  }
}

function sortFish() {
  
}

function bfs(fishPos) {
  const queue = [...fishPos];

  while(queue.length) {

    break;
  }

}

function solution() {
  let answer;
  while(1) {
    sharkPos = searchSharkPos();
    fishPos = searchEatableFish();
    if(!fishPos.length) break; // 먹을 수 있는 물고기 x
    
    sortFish(fishPos);
    bfs(fishPos);
    break;
  }

  return answer;
}

console.log(solution());