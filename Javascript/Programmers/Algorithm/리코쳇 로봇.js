function solution(board) {
    var answer = -1;

    const N = board.length;
    const M = board[0].length;

    const start = [0, 0];
    const end = [0, 0];

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (board[i][j] === "R") {
                start[0] = i;
                start[1] = j;
            } else if (board[i][j] === "G") {
                end[0] = i;
                end[1] = j;
            }
        }
    }

    const visited = Array.from({ length: N }, () => Array(M).fill(Infinity));

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    const go = (x, y, dir) => {
        let nx = x;
        let ny = y;
        let dist = 0;

        while (nx >= 0 && nx < N && ny >= 0 && ny < M && board[nx][ny] !== "D") {
            nx += dx[dir];
            ny += dy[dir];

            dist++;
        }

        if (nx === x && ny === y) {
            return [-1, -1];
        }

        nx -= dx[dir];
        ny -= dy[dir];

        return [nx, ny];
    };

    const bfs = () => {
        const queue = [[...start, 0]];

        while (queue.length > 0) {
            const [x, y, dist] = queue.shift();

            if (x === end[0] && y === end[1]) {
                answer = dist;
                break;
            }

            for (let i = 0; i < 4; i++) {
                const [nx, ny] = go(x, y, i);

                if (nx === -1) continue;

                if (visited[nx][ny] <= dist + 1) continue;

                visited[nx][ny] = dist + 1;
                queue.push([nx, ny, dist + 1]);
            }
        }
    };

    bfs();

    return answer;
}
