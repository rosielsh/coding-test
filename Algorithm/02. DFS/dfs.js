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

// 탐색 순서 : ['A', 'B', 'D', 'E', 'F', 'C', 'G', 'H', 'I', 'J']

const DFS = (graph, startNode) => {
    const visited = [];
    const needVisit = []; // stack으로 활용

    needVisit.push(startNode);

    while(needVisit.length !== 0) {
        const node = needVisit.pop(); // 가장 최근에 넣은 노드부터
        if(!visited.includes(node)) {
            needVisit.push(...graph[node].reverse());
            visited.push(node);
        }
    }
    return visited;
}

console.log(DFS(graph, 'A'));