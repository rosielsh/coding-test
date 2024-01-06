const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const [R, C, K] = input.shift().split(" ").map(Number);
const road = input.map((x) => x.split(""));

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];
const visited = Array.from({ length: R }, () => Array(C).fill(false));

let cnt = 0;
const dfs = (x, y, dist) => {
    // console.log(x, y, dist);
    if (dist > K) return;

    if (x === 0 && y === C - 1) {
        if (dist === K) cnt++;
        return;
    }

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= R || ny < 0 || ny >= C) continue;
        if (visited[nx][ny] || road[nx][ny] === "T") continue;
        visited[nx][ny] = true;
        dfs(nx, ny, dist + 1);
        visited[nx][ny] = false;
    }
};

visited[R - 1][0] = true;
dfs(R - 1, 0, 1);
console.log(cnt);
