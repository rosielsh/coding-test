function solution(n, computers) {
    var answer = 0;

    const graph = Array.from({ length: n }, () => []);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (computers[i][j]) {
                graph[i].push(j);
                graph[j].push(i);
            }
        }
    }

    const visited = Array.from({ length: n }, () => false);

    const bfs = (x) => {
        visited[x] = true;
        const queue = [x];

        while (queue.length > 0) {
            const cur = queue.shift();

            for (let next of graph[cur]) {
                if (visited[next]) continue;
                visited[next] = true;
                queue.push(next);
            }
        }
    };

    for (let i = 0; i < n; i++) {
        if (visited[i]) continue;
        answer++;
        bfs(i);
    }

    return answer;
}
