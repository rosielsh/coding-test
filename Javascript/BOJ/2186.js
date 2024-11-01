const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");
const [N, M, K] = input.shift().split(" ").map(Number);
const words = input.splice(0, N).map((x) => x.split(""));
const findWord = input[0];

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => Array(K + 1).fill(-1))
);

const dfs = (depth, x, y) => {
    if (depth === findWord.length) return (visited[x][y][depth] = 1);
    if (visited[x][y][depth] >= 0) return visited[x][y][depth];

    visited[x][y][depth] = 0;

    for (let i = 0; i < 4; i++) {
        for (let k = 1; k <= K; k++) {
            const nx = x + k * dx[i];
            const ny = y + k * dy[i];

            if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;
            if (findWord[depth] !== words[nx][ny]) continue;

            visited[x][y][depth] += dfs(depth + 1, nx, ny);
        }
    }

    return visited[x][y][depth];
};

let answer = 0;
for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
        if (words[i][j] === findWord[0]) {
            answer += dfs(1, i, j);
        }
    }
}

console.log(answer);
