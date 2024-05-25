function solution(land) {
    var answer = 0;

    const m = land[0].length;
    const n = land.length;

    const oil = Array.from({ length: n }, () => Array(m).fill(-1));
    const oilArr = []; // 인덱스 별 석유의 크기를 저장하는 배열

    const dx = [0, 0, -1, 1];
    const dy = [-1, 1, 0, 0];

    const bfs = (x, y) => {
        const queue = [[x, y]];

        let cnt = 1;
        land[x][y] = 0;
        oil[x][y] = oilIdx;

        while (queue.length > 0) {
            const [cx, cy] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nx = cx + dx[i];
                const ny = cy + dy[i];

                if (nx < 0 || nx >= n || ny < 0 || ny >= m || !land[nx][ny]) continue;

                land[nx][ny] = 0;
                cnt++;
                oil[nx][ny] = oilIdx;
                queue.push([nx, ny]);
            }
        }

        oilArr.push(cnt);
    };

    let oilIdx = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (land[i][j]) {
                bfs(i, j);
                oilIdx++;
            }
        }
    }

    for (let i = 0; i < m; i++) {
        const set = new Set();
        let sum = 0;

        for (let j = 0; j < n; j++) {
            if (oil[j][i] !== -1) {
                set.add(oil[j][i]);
            }
        }

        for (let idx of [...set]) {
            sum += oilArr[idx];
        }

        answer = Math.max(answer, sum);
    }

    return answer;
}
