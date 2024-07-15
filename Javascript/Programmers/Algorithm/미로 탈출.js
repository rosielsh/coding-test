function solution(maps) {
    var answer = 0;
    const N = maps.length;
    const M = maps[0].length;

    const start = [0, 0];
    const end = [0, 0];
    const laver = [0, 0];

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (maps[i][j] === "S") {
                start[0] = i;
                start[1] = j;
            } else if (maps[i][j] === "E") {
                end[0] = i;
                end[1] = j;
            } else if (maps[i][j] === "L") {
                laver[0] = i;
                laver[1] = j;
            }
        }
    }

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    const bfs = (st, en) => {
        const queue = [[st[0], st[1], 0]];
        const visited = Array.from({ length: N }, () => Array(M).fill(false));

        visited[st[0]][st[1]] = true;

        while (queue.length > 0) {
            const [x, y, dist] = queue.shift();

            if (x === en[0] && y === en[1]) {
                return dist;
            }

            for (let i = 0; i < 4; i++) {
                const nx = x + dx[i];
                const ny = y + dy[i];

                if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
                if (maps[nx][ny] === "X" || visited[nx][ny]) continue;

                visited[nx][ny] = true;

                queue.push([nx, ny, dist + 1]);
            }
        }

        return 0;
    };

    const res1 = bfs(start, laver);

    if (!res1) return -1;
    else answer += res1;

    const res2 = bfs(laver, end);

    if (!res2) return -1;
    else answer += res2;

    return answer;
}
