const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const N = +input[0];

const dx = [-1, -1, 1, 1, 1, -1];
const dy = [0, 1, 1, 0, -1, -1];

const nextIdx = {
    0: [1, 5],
    1: [0, 2],
    2: [1, 3],
    3: [2, 4],
    4: [3, 5],
    5: [0, 4],
};

let answer = 0;

const dfs = (cnt, x, y, prev, visited) => {
    if (cnt === N + 1) {
        if (visited[x][y]) answer++;
        return;
    }

    if (visited[x][y]) return;

    visited[x][y] = true;
    for (let next of nextIdx[prev]) {
        const nx = x + dx[next];
        const ny = y + dy[next];
        dfs(cnt + 1, nx, ny, next, visited);
    }
    visited[x][y] = false;
};

const visited = Array.from({ length: 100 }, () => Array(100).fill(false));
visited[51][50] = true;
dfs(1, 50, 50, 0, visited);

console.log(answer);
