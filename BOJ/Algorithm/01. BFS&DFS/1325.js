// 효율적인 해킹

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
[NM, ...edge] = require('fs').readFileSync(filePath).toString().trim().split('\n');
[N, M] = NM.split(' ').map(Number);

const graph = Array.from({length: N+1}, ()=>[]);
for(let i=0; i<M; i++) {
  [prev, next] = edge[i].split(' ').map(Number);
  graph[next].push(prev);
}

function dfs(startNode) {
  let visitCnt = 0;
  const needVisit = [startNode];
  const visited = Array.from({length: N+1}, ()=>0);
  visited[startNode] = 1;

  while(needVisit.length) {
    const curNode = needVisit.pop();

    if(graph[curNode]) {
      for(let i=0; i<graph[curNode].length; i++) {
        const nextNode = graph[curNode][i];
        if(visited[nextNode]) continue;
        visited[nextNode] = 1;
        needVisit.push(nextNode);
      }
    }
    visitCnt++;
  }
  return visitCnt;
}

function solution() {
  let answer = [];
  let cntList = Array.from({length: N}, ()=>0);
  for(let i=1; i<=N; i++) {
    cntList[i] = dfs(i);
  }

  let maxValue = Math.max(...cntList);
  for(let i=1; i<=N; i++) {
    if(cntList[i] === maxValue) {
      answer.push(i);
    }
  }

  return answer.join(' ');
}

console.log(solution());