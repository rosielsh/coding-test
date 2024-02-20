const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const n = +input.shift();
const area = input.map((x) => x.split(" ").map(Number));
const dp = Array.from({ length: n }, () => Array(n).fill(0));

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const dfs = (x, y) => {
    if (dp[x][y] > 0) return dp[x][y];

    dp[x][y] = 1;

    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
        if (area[nx][ny] <= area[x][y]) continue; // 갈려는 곳이 같거나 작으면 pass

        // 현재 위치에 최대값 저장
        dp[x][y] = Math.max(dp[x][y], dfs(nx, ny) + 1);
    }

    return dp[x][y];
};

let max = -1;
for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        max = Math.max(max, dfs(i, j));
    }
}

console.log(max);
