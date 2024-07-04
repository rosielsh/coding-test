function solution(a) {
    var answer = 0;
    const N = a.length;

    const cnt = Array.from({ length: N }, () => 0);

    for (let i = 0; i < N; i++) {
        cnt[a[i]]++;
    }

    // 존재하는 숫자
    for (let i = 0; i < N; i++) {
        if (answer >= cnt[i]) continue;

        let c = 0;
        for (let j = 0; j < N - 1; j++) {
            if (a[j] !== a[j + 1] && (i === a[j] || i === a[j + 1])) {
                c++;
                j++;
            }
        }

        answer = Math.max(answer, c);
    }

    answer *= 2;

    return answer;
}
