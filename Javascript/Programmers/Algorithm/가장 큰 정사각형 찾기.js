function solution(board) {
    let answer = 0;

    const N = board.length;
    const M = board[0].length;

    const dp = Array.from({ length: N }, () => Array(M).fill(0));

    for (let i = 0; i < N; i++) {
        dp[i][0] = board[i][0];

        answer = Math.max(answer, dp[i][0]);
    }

    for (let i = 0; i < M; i++) {
        dp[0][i] = board[0][i];

        answer = Math.max(answer, dp[0][i]);
    }

    for (let i = 1; i < N; i++) {
        for (let j = 1; j < M; j++) {
            if (board[i][j] === 0) continue;

            dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;

            answer = Math.max(dp[i][j], answer);
        }
    }

    return answer * answer;
}
