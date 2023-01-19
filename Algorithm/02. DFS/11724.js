// 문제 : 연결 요소의 개수
// 티어 : 실버 2

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().replace('\r', '').split(' ').map(x=>+x);
const graph = Array.from({length: N+1}, ()=>[]);
input.map(x=>{
  const [a, b] = x.replace('\r', '').split(' ').map(x=>+x);
  graph[a].push(b);
  graph[b].push(a);
})

function DFS(startNode) {
  const needVisit = [startNode];
  const visitedNode = [];
  
  while(needVisit.length) {
    const cur = needVisit.pop();
    
    if(!visitedNode.includes(cur)) {
      visitedNode.push(cur);
      needVisit.push(...graph[cur].reverse());
    }
  }
  return visitedNode;
}

function solution() {
  let answer = 0;
  const visited = [];
  for(let i=1; i<N+1; i++) {
    if(!visited.includes(i)) {
      visited.push(...DFS(i));
      answer++;
    }
  }
  return answer;
}

console.log(solution());