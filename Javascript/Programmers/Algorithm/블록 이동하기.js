function solution(board) {
    var answer = Number.MAX_SAFE_INTEGER;
    const N = board.length;

    const map = Array.from({ length: N + 2 }, () => Array(N + 2).fill(1));

    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            map[i][j] = board[i - 1][j - 1];
        }
    }

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    const set = new Set(); // 방문 체크

    const getNext = (x1, y1, x2, y2) => {
        const res = [];

        for (let i = 0; i < 4; i++) {
            const nx1 = x1 + dx[i];
            const ny1 = y1 + dy[i];
            const nx2 = x2 + dx[i];
            const ny2 = y2 + dy[i];

            if (!map[nx1][ny1] && !map[nx2][ny2]) {
                res.push([nx1, ny1, nx2, ny2]);
            }
        }

        // 회전
        [-1, 1].forEach((val) => {
            // 가로 방향
            if (x1 === x2) {
                if (!map[x2 + val][y2] && !map[x1 + val][y1]) {
                    res.push([x1, y1, x1 + val, y1]);
                    res.push([x2 + val, y2, x2, y2]);
                }
            }
            // 세로 방향
            else {
                if (!map[x1][y1 + val] && !map[x2][y2 + val]) {
                    res.push([x1, y1, x1, y1 + val]);
                    res.push([x2, y2 + val, x2, y2]);
                }
            }
        });

        return res;
    };

    const bfs = () => {
        set.add("1 1 1 2");

        const queue = [[1, 1, 1, 2, 0]];

        while (queue.length > 0) {
            const [x1, y1, x2, y2, sec] = queue.shift();

            if ((x1 === N && y1 === N) || (x2 === N && y2 === N)) {
                answer = sec;
                break;
            }

            const res = getNext(x1, y1, x2, y2);

            for (let r of res) {
                const [nx1, ny1, nx2, ny2] = r;

                if (set.has(`${nx1} ${ny1} ${nx2} ${ny2}`)) continue;

                set.add(`${nx1} ${ny1} ${nx2} ${ny2}`);
                queue.push([...r, sec + 1]);
            }
        }
    };

    bfs();

    return answer;
}
