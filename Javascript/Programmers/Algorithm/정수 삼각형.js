function solution(triangle) {
    var answer = 0;

    const dp = [];
    const n = triangle.length;

    for (let i = 1; i <= n + 1; i++) {
        dp.push(Array(i).fill(0));
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            if (j === i) {
                dp[i][j] = Math.max(dp[i][j], dp[i - 1][j - 1] + triangle[i - 1][j - 1]);
            } else {
                dp[i][j] = Math.max(
                    dp[i][j],
                    dp[i - 1][j] + triangle[i - 1][j - 1],
                    dp[i - 1][j - 1] + triangle[i - 1][j - 1]
                );
            }
        }
    }

    answer = Math.max(...dp[n]);

    return answer;
}
