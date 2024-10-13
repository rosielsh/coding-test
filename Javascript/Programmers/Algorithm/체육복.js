function solution(n, lost, reserve) {
    const cnt = Array.from({ length: n + 1 }, () => 1);

    for (let i of reserve) {
        cnt[i]++;
    }

    for (let i of lost) {
        cnt[i]--;
    }

    for (let i = 1; i <= n; i++) {
        if (cnt[i] === 0) {
            if (i > 1 && cnt[i - 1] === 2) {
                cnt[i]++;
                cnt[i - 1]--;
                continue;
            }

            if (i < n && cnt[i + 1] === 2) {
                cnt[i]++;
                cnt[i + 1]--;
            }
        }
    }

    return cnt.filter((x) => x >= 1).length - 1;
}
