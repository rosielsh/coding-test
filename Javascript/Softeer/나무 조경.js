const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const n = +input.shift();
const tree = input.map((x) => x.split(" ").map(Number));

let maxSum = -1;

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const visited = Array.from({ length: n }, () => Array(n).fill(false));

const dfs = (depth, sum) => {
    maxSum = Math.max(sum, maxSum);
    if (depth === 4) {
        return;
    }

    // 아무렇게나 쌍 4개 만들기
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (visited[i][j]) continue;
            visited[i][j] = true;

            // 현재 점 : [i, j] 다음 점 : 4방향 탐색
            for (let k = 0; k < 4; k++) {
                const ni = i + dx[k];
                const nj = j + dy[k];

                if (ni < 0 || ni >= n || nj < 0 || nj >= n) continue;
                if (visited[ni][nj]) continue;

                visited[ni][nj] = true;
                dfs(depth + 1, sum + tree[i][j] + tree[ni][nj]);
                visited[ni][nj] = false;
            }

            visited[i][j] = false;
        }
    }
};

dfs(0, 0);

console.log(maxSum);
