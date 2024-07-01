function solution(board, skill) {
    // skill만큼 [구간1-구간2] 사이에 값을 갱신 => 250,000 * 1000 * 1000 = 시간 초과
    // 어떻게 board와 skill을 순회하지 않고 값을 저장하는지... => 해설 참고

    // 누적합의 특성을 사용해서 지금까지 각 board에 해당하는 연산을 누적해서 계산하는 것
    // 2차원 배열에서 [r1,c1] ~ [r2,c2]사이의 원소에 k만큼의 변화를 주고 싶다면
    // 빈 누적합 배열을 만들어서 [r1,c1] = +k, [r2+1,c1] = -k, [r1, c2+1] = -k, [r2+1, c2+1] = k를 대입 후, 누적합을 구하면 된다

    var answer = 0;

    const N = board.length;
    const M = board[0].length;
    const sum = Array.from({ length: N + 2 }, () => Array(M + 2).fill(0));

    for (let [type, r1, c1, r2, c2, degree] of skill) {
        if (type === 1) {
            sum[r1 + 1][c1 + 1] -= degree;
            sum[r2 + 2][c1 + 1] += degree;
            sum[r1 + 1][c2 + 2] += degree;
            sum[r2 + 2][c2 + 2] -= degree;
        } else {
            sum[r1 + 1][c1 + 1] += degree;
            sum[r2 + 2][c1 + 1] -= degree;
            sum[r1 + 1][c2 + 2] -= degree;
            sum[r2 + 2][c2 + 2] += degree;
        }
    }

    const fSum = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= M; j++) {
            fSum[i][j] = fSum[i - 1][j] + fSum[i][j - 1] - fSum[i - 1][j - 1] + sum[i][j];
        }
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (board[i][j] + fSum[i + 1][j + 1] > 0) answer++;
        }
    }

    return answer;
}
