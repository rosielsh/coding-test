// 상근이의 여행

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
const T = +input.shift();

function bfs(graph, world, startNode) {
  let cnt = 0;
  const needVisit = [startNode];
  const visited = Array.from({length: world}, ()=>0);

  while(needVisit.length) {
    const curNode = needVisit.shift();
    if(!visited[curNode]) {
      visited[curNode] = 1;
      needVisit.push(...graph[curNode]);
      cnt++;
    }
  }
  return cnt-1;
}

function solution() {
  let answer = [];

  for(let t=0; t<T; t++) {
    [N, M] = input.shift().split(' ').map(Number);
    airplane = input.splice(0, M);

    graph = Array.from({length: N+1}, ()=>[]);

    for(let i=0; i<M; i++) {
      [a, b] = airplane[i].split(' ').map(Number);
      graph[a].push(b);
      graph[b].push(a);
    }

    answer.push(bfs(graph, N, 1));
  }
  return answer.join('\n');
}

console.log(solution());


// MST 특징 활용
// 상근이의 여행

// const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
// const input = require('fs').readFileSync(filePath).toString().trim().split('\n');
// const T = +input.shift();

// function solution() {
//   let answer = '';
//   for(let t=0; t<T; t++) {
//     [N, M] = input.shift().split(' ').map(Number);
//     airplane = input.splice(0, M);
//     answer += `${N-1}\n`;
//   }
//   return answer;
// }

// console.log(solution());