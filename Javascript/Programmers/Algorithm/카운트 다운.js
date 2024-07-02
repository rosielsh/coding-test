function solution(target) {
    var answer = [];

    // [최소 다트 수, 싱글+볼 합]
    const dp = Array.from({ length: target + 1 }, () => Array(2).fill(0));

    for (let i = 1; i <= target; i++) {
        dp[i][0] = Number.MAX_SAFE_INTEGER;
    }

    for (let s = 1; s <= target; s++) {
        for (let i = 1; i <= 20; i++) {
            // 볼
            if (s - 50 >= 0) {
                if (dp[s][0] > dp[s - 50][0] + 1) {
                    dp[s][0] = dp[s - 50][0] + 1;
                    dp[s][1] = dp[s - 50][1] + 1;
                } else if (dp[s][0] === dp[s - 50][0] + 1) {
                    dp[s][1] = Math.max(dp[s][1], dp[s - 50][1] + 1);
                }
            }

            // 싱글
            if (s - i >= 0) {
                if (dp[s][0] > dp[s - i][0] + 1) {
                    dp[s][0] = dp[s - i][0] + 1;
                    dp[s][1] = dp[s - i][1] + 1;
                } else if (dp[s][0] === dp[s - i][0] + 1) {
                    dp[s][1] = Math.max(dp[s][1], dp[s - i][1] + 1);
                }
            }

            // 더블
            if (s - 2 * i >= 0) {
                if (dp[s][0] > dp[s - 2 * i][0] + 1) {
                    dp[s][0] = dp[s - 2 * i][0] + 1;
                    dp[s][1] = dp[s - 2 * i][1];
                }
            }

            // 트리플
            if (s - 3 * i >= 0) {
                if (dp[s][0] > dp[s - 3 * i][0] + 1) {
                    dp[s][0] = dp[s - 3 * i][0] + 1;
                    dp[s][1] = dp[s - 3 * i][1];
                }
            }
        }
    }

    answer = [dp[target][0], dp[target][1]];

    return answer;
}
