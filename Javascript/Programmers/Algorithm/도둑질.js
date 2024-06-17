function solution(money) {
    var answer = 0;

    const N = money.length;
    const dp1 = Array.from({ length: N + 1 }, () => 0); // 1번째 집을 터는 경우
    const dp2 = Array.from({ length: N + 1 }, () => 0); // 마지막 집을 터는 경우

    dp1[1] = money[0];
    for (let i = 2; i < N; i++) {
        dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + money[i - 1]);
    }

    for (let i = 2; i <= N; i++) {
        dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + money[i - 1]);
    }

    answer = Math.max(dp1[N - 1], dp2[N]);

    return answer;
}
