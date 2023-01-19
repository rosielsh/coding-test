const graph = {
    A: ["B", "C"],
    B: ["A", "D"],
    C: ["A", "G", "H", "I"],
    D: ["B", "E", "F"],
    E: ["D"],
    F: ["D"],
    G: ["C"],
    H: ["C"],
    I: ["C", "J"],
    J: ["I"]
  };

// 그래프
//         A
//       /  \
//     B     C
//    /   / | \
//   D   G  H  I
//  / \        | 
// E  F        J 

// 탐색 순서 : ['A', 'B', 'C', 'D', 'G', 'H', 'I', 'E', 'F', 'J']

const BFS = (graph, startNode) => {
    const visited = []; // 탐색이 끝난 노드들
    let needVisit = []; // 탐색해야할 노드들 (큐로 활용)

    needVisit.push(startNode); // 시작 노드를 추가

    while(needVisit.length !== 0) { // 탐색해야할 노드가 비지 않는 동안
        const node = needVisit.shift(); // 후보 노드 제일 앞 노드를 빼서
        if(!visited.includes(node)) { // 방문한 적이 있는지 확인
            visited.push(node); // 방문한 적이 없다면 현재 노드를 push
            needVisit.push(...graph[node]);
        }
    }
    return visited;
}

console.log(BFS(graph, 'A'));


