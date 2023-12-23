const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, Q] = input.shift().split(" ").map(Number);
const mapSize = 2 ** N;
let map = input.splice(0, mapSize).map((x) => x.split(" ").map(Number));
const L = input.shift().split(" ").map(Number); // 각 명령 Q별 단계 L

const rotateMap = (size) => {
    const newMap = Array.from({ length: mapSize }, () => Array(mapSize).fill(0));

    for (let i = 0; i < mapSize; i += size) {
        for (let j = 0; j < mapSize; j += size) {
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    newMap[i + c][j + size - r - 1] = map[r + i][c + j];
                }
            }
        }
    }

    map = newMap.map((x) => [...x]);
};

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const melt = () => {
    const meltPos = [];

    for (let i = 0; i < mapSize; i++) {
        for (let j = 0; j < mapSize; j++) {
            let cnt = 0;
            for (let d = 0; d < 4; d++) {
                const nx = i + dx[d];
                const ny = j + dy[d];

                if (nx < 0 || nx >= mapSize || ny < 0 || ny >= mapSize) continue;

                if (map[nx][ny] > 0) cnt++;
            }

            if (cnt < 3 && map[i][j] > 0) {
                meltPos.push([i, j]);
            }
        }
    }

    for (let [x, y] of meltPos) {
        map[x][y] -= 1;
    }
};

let visited;

const bfs = (x, y) => {
    const queue = [[x, y]];
    let cnt = 0;
    let sum = 0;

    while (queue.length) {
        const [cx, cy] = queue.shift();

        cnt++;
        sum += map[cx][cy];

        for (let i = 0; i < 4; i++) {
            const nx = cx + dx[i];
            const ny = cy + dy[i];

            if (nx < 0 || nx >= mapSize || ny < 0 || ny >= mapSize) continue;
            if (visited[nx][ny]) continue;
            if (map[nx][ny] === 0) continue; // 0인곳도 퍼트리면 안됨

            visited[nx][ny] = true;
            queue.push([nx, ny]);
        }
    }

    return [sum, cnt];
};

const calcSum = () => {
    let totalSum = 0; // 모든 격자에 있는 얼음 합
    let maxCnt = 0; // 하나의 덩어리 중 최대 개수

    visited = Array.from({ length: mapSize }, () => Array(mapSize).fill(false));

    for (let i = 0; i < mapSize; i++) {
        for (let j = 0; j < mapSize; j++) {
            if (map[i][j] > 0 && !visited[i][j]) {
                visited[i][j] = true;
                const [sum, cnt] = bfs(i, j);
                totalSum += sum;
                maxCnt = Math.max(cnt, maxCnt);
            }
        }
    }

    return [totalSum, maxCnt];
};

for (let i = 0; i < Q; i++) {
    const l = 2 ** L[i];
    rotateMap(l);
    melt();
}

console.log(calcSum().join("\n"));
