const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = input.shift().split(" ").map(Number);
const board = input.splice(0, n).map((x) => x.split(" ").map(Number));
const pos = input.map((x) => x.split(" ").map(Number));

const visited = Array.from({ length: n }, () => Array(n).fill(false));

let cnt = 0;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const dfs = (depth, x, y) => {
    if (pos[depth][0] - 1 === x && pos[depth][1] - 1 === y) {
        if (depth === m - 1) {
            cnt++;
            return;
        }

        depth += 1; // 다음 인덱스로 이동
    }

    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= n || ny < 0 || ny >= n || board[nx][ny] || visited[nx][ny]) continue;

        dfs(depth, nx, ny);
    }

    visited[x][y] = false;
};

dfs(1, pos[0][0] - 1, pos[0][1] - 1);

console.log(cnt);
