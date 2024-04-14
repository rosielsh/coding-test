function solution(info, edges) {
    var answer = 0;

    // 모은 양의 수 <= 늑대의 수 => 모든 양 소멸

    // info[i]: i번 노드에 있는 양: 0, 늑대: 1
    // edges: [부모 노드 번호, 자식 노드 번호]

    const nodeCnt = info.length;
    const graph = Array.from({ length: nodeCnt }, () => []);

    for (let [a, b] of edges) {
        graph[a].push(b);
    }

    let maxSheepCnt = -1;

    const dfs = (x, sheepCnt, wolfCnt, visited) => {
        if (sheepCnt <= wolfCnt) return;
        maxSheepCnt = maxSheepCnt > sheepCnt ? maxSheepCnt : sheepCnt;

        for (let i = 0; i < graph[x].length; i++) {
            const nx = graph[x][i];
            visited = visited | (1 << nx); // 다음으로 이동할 노드 방문처리
        }

        for (let i = 0; i < nodeCnt; i++) {
            if ((visited & (1 << i)) === 0) continue; // 이미 방문했으면 pass

            visited = visited ^ (1 << i);

            if (info[i] === 1) {
                dfs(i, sheepCnt, wolfCnt + 1, visited);
            } else if (info[i] === 0) {
                dfs(i, sheepCnt + 1, wolfCnt, visited);
            }
            visited = visited ^ (1 << i);
        }
    };

    dfs(0, 1, 0, 0);

    answer = maxSheepCnt;
    console.log(answer);
    return answer;
}
