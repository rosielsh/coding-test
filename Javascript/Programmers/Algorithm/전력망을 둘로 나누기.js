function solution(n, wires) {
    var answer = -1;
    let visited;
    let minSub = Number.MAX_SAFE_INTEGER;

    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < n - 1; i++) {
        const [a, b] = wires[i];
        graph[a].push(b);
        graph[b].push(a);
    }

    function bfs(start, unConnectA, unConnectB) {
        let cnt = 1;
        const queue = [start];
        visited[start] = 1;

        while (queue.length) {
            const cur = queue.shift();

            for (let i = 0; i < graph[cur].length; i++) {
                const next = graph[cur][i];

                if (cur == unConnectA && next === unConnectB) continue;
                if (cur == unConnectB && next === unConnectA) continue;
                if (visited[next]) continue;

                visited[next] = 1;
                cnt++;
                queue.push(next);
            }
        }

        return cnt;
    }

    for (let i = 0; i < n - 1; i++) {
        const unConnected = wires[i];

        visited = Array.from({ length: n + 1 }, () => 0);

        let cnt = 0;
        let res = [0, 0];
        for (let j = 1; j <= n; j++) {
            if (visited[j]) continue;

            res[cnt++] = bfs(j, unConnected[0], unConnected[1]); // 현재 위치에서 bfs 돌리기
        }

        minSub = Math.min(minSub, Math.abs(res[0] - res[1]));
    }

    answer = minSub;
    return answer;
}
