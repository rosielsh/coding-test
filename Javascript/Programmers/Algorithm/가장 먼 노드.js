function solution(n, edge) {
    var answer = 0;

    // 1번 노드로부터 가장 멀리 떨어진 노드의 개수

    const graph = Array.from({ length: n + 1 }, () => []); // 각 노드에 연결된 노드들

    for (let [a, b] of edge) {
        graph[a].push(b);
        graph[b].push(a);
    }

    const visited = Array.from({ length: n + 1 }, () => false);
    const depthNodeCnt = Array.from({ length: 20001 }, () => 0);

    const bfs = () => {
        // node, depth
        const queue = [[1, 0]];
        visited[1] = true;
        depthNodeCnt[0] = 1;

        while (queue.length > 0) {
            const [x, depth] = queue.shift();

            for (let i = 0; i < graph[x].length; i++) {
                const nx = graph[x][i]; // 다음 노드
                if (visited[nx]) continue;
                depthNodeCnt[depth + 1]++;
                visited[nx] = true;
                queue.push([nx, depth + 1]);
            }
        }
    };

    bfs();

    for (let i = 20000; i >= 0; i--) {
        if (depthNodeCnt[i] > 0) {
            answer = depthNodeCnt[i];
            break;
        }
    }

    return answer;
}
