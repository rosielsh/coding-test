function solution(maps) {
    var answer = [];
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    const N = maps.length;
    const M = maps[0].length;

    const visited = Array.from({ length: N }, () => Array(M).fill(false));

    const bfs = (x, y) => {
        let sum = +maps[x][y];
        const queue = [[x, y]];
        visited[x][y] = true;

        while (queue.length) {
            const [cx, cy] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nx = cx + dx[i];
                const ny = cy + dy[i];

                if (
                    nx < 0 ||
                    nx >= N ||
                    ny < 0 ||
                    ny >= M ||
                    maps[nx][ny] === "X" ||
                    visited[nx][ny]
                )
                    continue;

                queue.push([nx, ny]);
                visited[nx][ny] = true;
                sum += +maps[nx][ny];
            }
        }

        return sum;
    };

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (maps[i][j] === "X" || visited[i][j]) continue;
            answer.push(bfs(i, j));
        }
    }

    if (!answer.length) answer.push(-1);
    return answer.sort((a, b) => a - b);
}
