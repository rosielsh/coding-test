const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(" ").map(Number);
const map = input.map((x) => x.split(" ").map(Number));

const virusPossiblePos = [];
let wall = 0;
let blank = 0;

for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        if (map[i][j] === 2) {
            virusPossiblePos.push([i, j]);
        }

        if (map[i][j] === 1) wall++;
        if (map[i][j] === 0) blank++;
    }
}

if (N * N - wall === M) {
    console.log(0);
    return;
}

const virus = [];

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const bfs = () => {
    let cnt = M; // 전체 바이러스를 퍼트린 개수
    let needCnt = N * N - wall;

    const queue = [];
    const visited = Array.from({ length: N }, () => Array(N).fill(false));

    for (let [x, y] of virus) {
        queue.push([x, y, 0]);
        visited[x][y] = true;
    }

    while (queue.length) {
        const [cx, cy, time] = queue.shift();

        // 4방향 돌려보기
        for (let i = 0; i < 4; i++) {
            const nx = cx + dx[i];
            const ny = cy + dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
            if (visited[nx][ny]) continue; // 방문했으면 pass
            if (map[nx][ny] === 1) continue; // 벽이면 pass

            cnt++;
            if (cnt === needCnt) return time + 1;
            visited[nx][ny] = true;
            queue.push([nx, ny, time + 1]);
        }
    }

    return -1;
};

let minTime = Number.MAX_SAFE_INTEGER;

const combi = (depth, idx) => {
    if (depth === M) {
        // bfs
        const time = bfs();

        if (time !== -1) minTime = Math.min(time, minTime);
        return;
    }

    for (let i = idx; i < virusPossiblePos.length; i++) {
        virus.push([virusPossiblePos[i][0], virusPossiblePos[i][1]]);
        combi(depth + 1, i + 1);
        virus.pop();
    }
};

combi(0, 0);

console.log(minTime === Number.MAX_SAFE_INTEGER ? -1 : minTime);
