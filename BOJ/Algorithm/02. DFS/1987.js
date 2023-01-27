const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [R, C] = input.shift().split(' ').map(Number);
const board = input.map(x=>x.replace('\r','').split('').map(v=>v.charCodeAt(0)-65));
const visited = Array.from({length: 26}, ()=>0);
visited[board[0][0]] = true; 

let answer = 0;
const pos = [[0, -1], [0, 1], [1, 0], [-1, 0]];

function solution(y, x, cnt) {
  answer = Math.max(answer, cnt);

  for(let i=0; i<4; i++) {
    const adjY = y + pos[i][0];
    const adjX = x + pos[i][1];
    
    if(adjY < 0 || adjY >= R || adjX < 0 || adjX >= C) continue;

    const v = board[adjY][adjX];
    if(!visited[v]) {
      visited[v] = 1;
      solution(adjY, adjX, cnt+1);
      visited[v] = 0;
    }
  }
  return answer;
}

console.log(solution(0,0,1));