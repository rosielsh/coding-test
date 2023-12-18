const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
let map = input.map((x) => x.split(" ").map(Number));

const virus = [];
const selected = [];
let totalBlank = 0;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (map[i][j] === 2) {
            virus.push([i, j]);
        }

        if (map[i][j] === 0) {
            totalBlank++;
        }
    }
}

if (totalBlank === 0) {
    console.log(0);
    return;
}

let minTime = Number.MAX_SAFE_INTEGER;
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const bfs = () => {
    let spreadCnt = 0;
    const visited = Array.from({ length: N }, () => Array(N).fill(-1));
    const queue = [];

    for (let [x, y] of selected) {
        queue.push([x, y, 0]);
        visited[x][y] = 0;
    }

    while (queue.length) {
        const [cx, cy, ct] = queue.shift();

        for (let i = 0; i < 4; i++) {
            const nx = cx + dx[i];
            const ny = cy + dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            if (map[nx][ny] === 1) continue;

            // 다음 칸이 바이러스일 때
            if (map[nx][ny] === 2) {
                // 활성 바이러스
                if (visited[nx][ny] >= 0) continue;
                // 비활성 바이러스
                if (visited[nx][ny] === -1) {
                    queue.push([nx, ny, ct + 1]);
                    visited[nx][ny] = ct + 1;
                }
            }

            if (visited[nx][ny] > -1) continue;

            visited[nx][ny] = ct + 1;
            spreadCnt++;
            queue.push([nx, ny, ct + 1]);
        }

        if (spreadCnt === totalBlank) {
            minTime = Math.min(minTime, ct + 1);
            break;
        }
    }
};

const combi = (depth, idx) => {
    if (depth === M) {
        bfs();
        return;
    }

    for (let i = idx; i < virus.length; i++) {
        selected.push(virus[i]);
        combi(depth + 1, i + 1);
        selected.pop();
    }
};

combi(0, 0);

console.log(minTime === Number.MAX_SAFE_INTEGER ? -1 : minTime);
