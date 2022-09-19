// 문제 : DFS와 BFS(1260)

// 입력 : 정점의 개수(N), 간선의 개수(M), 시작 번호(V) / 두 정점의 번호 * M
// 출력 : DFS 및 BFS 수행 결과

const dfs = (start) => {
    const stack = [];
    const result = [];
    const visited = Array.from({length: N+1}, () => false);

    stack.push(start);
    graph.map(v => v.sort((a, b) => b - a)); // 내림

    while(stack.length) {
        const currentNode = stack.pop();
        if(!visited[currentNode]) {
            stack.push(...graph[currentNode]);
            visited[currentNode] = true;
            result.push(currentNode);
        }
    }

    console.log(result.join(' '));
  };
  

const bfs = (start) => {
    const queue = [];
    const result = [start];
    const visited = Array.from({length: N+1}, () => false);

    queue.push(start);
    visited[start] = true;

    graph.map(v => v.sort((a, b) => a - b)); // 오름

    while(queue.length) {
        const currentNode = queue.shift(); 

        graph[currentNode].forEach((ele) => {
            if(!visited[ele]) {
                queue.push(ele);
                result.push(ele);
                visited[ele] = true;
            }
        })
    }
    console.log(result.join(' '));

}


// input
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require('fs').readFileSync(filePath).toString().split('\n');

// parsing
const [N, M, V] = input[0].split(' ').map(ele=>+ele);
const edges = [];
for(let i = 0; i < M; i++) {
    edges.push(input[i+1].split(' ').map(ele => +ele));
}

// 그래프 정의 및 간선 연결
const graph = [...Array(N+1)].map(() => []);
edges.forEach(([a, b]) => {
    graph[a].push(b);
    graph[b].push(a);
});

dfs(V);
bfs(V);