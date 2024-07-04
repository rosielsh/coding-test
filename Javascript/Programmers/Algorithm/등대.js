function solution(n, lighthouse) {
    // tc 9번 런타임 에러
    // dp + 트리 => [등대를 안 켠 경우, 켠 경우] 최적해를 구하기

    var answer = 0;

    const graph = Array.from({ length: n + 1 }, () => []);

    for (let [a, b] of lighthouse) {
        graph[a].push(b);
        graph[b].push(a);
    }

    const dp = Array.from({ length: n + 1 }, () => Array(2).fill(0));
    const visited = Array.from({ length: n + 1 }, () => false);

    const dfs = (x) => {
        dp[x][1] = 1;

        for (let i = 0; i < graph[x].length; i++) {
            const next = graph[x][i];
            if (visited[next]) continue;
            visited[next] = true;

            dfs(next);

            dp[x][0] += dp[next][1]; // 부모가 안 켠 경우 자식이 켜진 경우만 고려
            dp[x][1] += Math.min(dp[next][0], dp[next][1]); // 켠 경우 자식의 2가지 상태 중 최소값
        }
    };

    visited[1] = true;
    dfs(1);

    console.log(dp);

    return answer;
}
