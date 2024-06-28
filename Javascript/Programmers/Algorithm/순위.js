function solution(n, results) {
    var answer = 0;

    const dist = Array.from({ length: n + 1 }, () => Array(n + 1).fill(Infinity));

    for (let i = 1; i <= n; i++) {
        dist[i][i] = 0;
    }

    for (let [to, from] of results) {
        dist[from][to] = 1;
    }

    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) dist[i][j] = dist[i][k] + dist[k][j];
            }
        }
    }

    for (let i = 1; i <= n; i++) {
        let cnt = 0; // 승패를 알 수 있는 사람 수
        for (let j = 1; j <= n; j++) {
            if (dist[i][j] !== Infinity && dist[i][j] > 0) cnt++;

            if (dist[j][i] !== Infinity && dist[j][i] > 0) cnt++;
        }

        if (cnt === n - 1) answer++;
    }

    return answer;
}
