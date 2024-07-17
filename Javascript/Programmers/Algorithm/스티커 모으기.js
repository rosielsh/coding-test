function solution(sticker) {
    var answer = 0;

    const N = sticker.length;

    if (N === 1) return sticker[0];

    const dp = Array.from({ length: N }, () => 0);
    const dp1 = Array.from({ length: N }, () => 0);

    dp[0] = sticker[0];
    dp[1] = dp[0];

    for (let i = 2; i < N - 1; i++) {
        dp[i] = Math.max(dp[i - 2] + sticker[i], dp[i - 1]);
    }

    answer = Math.max(answer, dp[N - 2]);

    dp1[1] = sticker[1];

    for (let i = 2; i < N; i++) {
        dp1[i] = Math.max(dp1[i - 2] + sticker[i], dp1[i - 1]);
    }

    answer = Math.max(answer, dp1[N - 1]);

    return answer;
}
