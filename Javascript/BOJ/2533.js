const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift();
const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N + 1 }, () => false);
const dp = Array.from({ length: N + 1 }, () => Array(2).fill(0));
// 0번 인덱스 : n번 친구가 얼리어 답터가 아닐때 최소 얼리어답터 수 => 연결된 친구들은 모두 얼리어답터여야 함
// 1번 인덱스 : n번 친구가 얼리어 답터일 때 최소 얼리어답터 수 => 친구들이 뭐든 상관없음

for (let i = 0; i < input.length; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
}

const dfs = (x) => {
    visited[x] = true;
    dp[x][0] = 0; // 나를 얼리어답터라고 가정하지 않음
    dp[x][1] = 1; // 나를 얼리어답터라고 가정

    for (let i = 0; i < graph[x].length; i++) {
        const next = graph[x][i];

        if (visited[next]) continue;
        dfs(next);

        dp[x][0] += dp[next][1]; // 나랑 연결된 친구는 모두 얼리어답터라고 가정
        dp[x][1] += Math.min(dp[next][0], dp[next][1]); // 얼리어답터일 수 있고, 아닐 수 있다
    }
};

dfs(1);

console.log(Math.min(...dp[1]));
