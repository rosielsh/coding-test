// 여행 가자 

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[N, M, ...info] = require('fs').readFileSync(filePath).toString().trim().split('\n');
N = +N;
M = +M;
edge = info.splice(0, N).map(x=>x.split(' ').map(Number));
city = info[0].split(' ').map(Number);

// 인접 리스트 생성
const graph = Array.from({length: N+1}, ()=>[]);
for(let i=0; i<N; i++) {
  for(let j=i+1; j<N; j++) {
    if(edge[i][j]) {
      graph[i+1].push(j+1);
      graph[j+1].push(i+1);
    }
  }
}

// dfs 
function dfs(start, goal) {
  const stack = [start];
  const visited = Array.from({length: N+1}, ()=>0);
  visited[start] = 1;

  while(stack.length) {
    curNode = stack.pop();

    // 목표물 찾으면 0 반환 
    if(curNode === goal) return 0;

    for(let i=0; i<graph[curNode].length; i++) {
      adjNode = graph[curNode][i]; // 인접 노드

      if(visited[adjNode]) continue;
      visited[adjNode] = 1;
      stack.push(adjNode);
    }
  }

  // 목표물 못찾으면 -1 반환 
  return -1;
}

function solution() {
  let answer;
  let isPossible = true;
  // 0번 - M-1번 도시에 대해서 탐색 
  for(let i=0; i<M-1; i++) {
    if(dfs(city[i], city[i+1]) === -1) {
      isPossible = false;
      break;
    }
  }
  answer = isPossible ? 'YES' : 'NO';
  return answer;
}

console.log(solution());