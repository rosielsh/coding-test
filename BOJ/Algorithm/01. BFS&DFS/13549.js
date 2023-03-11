// 숨바꼭질 3

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, K] = require('fs').readFileSync(filePath).toString().trim().split(' ').map(Number);

function bfs(start) {
  const queue = [[start, 0]];
  const visited = Array.from({length: 200001}, ()=>0);
  visited[start] = 1;

  while(queue.length) {
    [curPos, time] = queue.shift();

    if(curPos === K) {
      return time;
    }

    // 순간 이동 
    if(2*curPos >= 0 && 2*curPos <= 200001 && !visited[2*curPos]) {
      visited[2*curPos] = 1;
      queue.unshift([2*curPos, time]);
    }

    // x+1, x-1 이동 
    for(let x of [curPos+1, curPos-1]) {
      if(x < 0 || x >= 200000) continue;
      if(visited[x]) continue;
      visited[x] = 1;
      queue.push([x, time+1]);
    }
  }
}

function solution() {
  let answer = 0;
  answer = bfs(N);
  return answer;
}

console.log(solution());